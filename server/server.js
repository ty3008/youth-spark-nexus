const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Models
const Event = require('./models/Event');
const Contact = require('./models/Contact');
const seedGatherings = require('./seed/gatherings.json');

// Load environment variables from server/.env specifically
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error('❌ JWT_SECRET is not set. Refusing to start for security reasons.');
    process.exit(1);
}

// --- Middleware ---
app.use(helmet());

const allowedOrigins = [
    'http://localhost:5173',
    'https://youthsparksummit.org',
    'https://www.youthsparksummit.org',
    'https://youth-spark-nexus.vercel.app',
].filter(Boolean);

// Allow Vercel preview deployments (*.vercel.app)
const isVercelPreview = (origin) => typeof origin === 'string' && /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || isVercelPreview(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
}));

// Limit request body size to mitigate payload attacks
app.use(express.json({ limit: '10kb' }));

// General API rate limit (per IP)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', apiLimiter);

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
});

// Simple validation helpers
const isValidObjectId = (id) => id && mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === String(id);
const trimStr = (s, max) => (typeof s === 'string' ? s.trim().slice(0, max) : '');
const trimList = (arr, max, maxItems = 40) =>
    Array.isArray(arr) ? arr.map((s) => trimStr(s, max)).filter(Boolean).slice(0, maxItems) : undefined;
const slugify = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 100);
const isValidDate = (s) => /^\d{4}-\d{2}(-\d{2})?$/.test(s);
// Only web links are accepted for films and recaps. Empty is allowed. This blocks javascript: and data: URLs.
const isWebUrl = (s) => s === '' || /^https?:\/\/[^\s]+$/i.test(s);

// Pick the gathering fields an admin may set. Fields that are not sent are left out so they are not overwritten.
// Returns { data, error }.
const gatheringFields = (raw) => {
    const out = {};
    const str = (key, max) => { if (raw[key] !== undefined) out[key] = trimStr(raw[key], max); };
    str('title', 200);
    str('time', 80);
    str('venue', 300);
    str('summary', 2000);
    str('cover', 500);
    str('youtubeUrl', 500);
    str('instagramUrl', 500);
    if (raw.date !== undefined) out.date = trimStr(raw.date, 20);
    if (raw.program !== undefined) out.program = Event.PROGRAMS.includes(raw.program) ? raw.program : '';
    if (raw.status !== undefined) out.status = raw.status === 'upcoming' ? 'upcoming' : 'held';
    if (raw.datePrecision !== undefined) out.datePrecision = raw.datePrecision === 'month' ? 'month' : 'day';
    const details = trimList(raw.details, 500);
    if (details) out.details = details;
    const speakers = trimList(raw.speakers, 120);
    if (speakers) out.speakers = speakers;
    const gallery = trimList(raw.gallery, 500);
    if (gallery) out.gallery = gallery;
    if (Array.isArray(raw.videos)) {
        out.videos = raw.videos
            .map((v) => ({ label: trimStr(v && v.label, 200), url: trimStr(v && v.url, 500) }))
            .filter((v) => v.label && v.url)
            .slice(0, 40);
    }
    for (const key of ['youtubeUrl', 'instagramUrl']) {
        if (out[key] !== undefined && !isWebUrl(out[key])) return { error: `${key} must start with http:// or https://` };
    }
    if (out.videos && out.videos.some((v) => !isWebUrl(v.url))) return { error: 'Every video link must start with http:// or https://' };
    return { data: out };
};

const uniqueSlug = async (base) => {
    let slug = base || 'gathering';
    let n = 2;
    while (await Event.exists({ slug })) slug = `${base}-${n++}`;
    return slug;
};

// --- MongoDB Connection ---
const DB_RETRY_MS = 30_000;
let isConnectingDb = false;

const ensureDbConnected = (res) => {
    if (mongoose.connection.readyState === 1) return true;
    return res.status(503).json({
        success: false,
        message: 'Database is temporarily unavailable. Please try again in a moment.',
    });
};

// Every restart upserts each canonical gathering by slug, so a slug can never appear twice.
// Cover and gallery are never written by the seed, so photos added later through /admin survive a restart.
const seedInitialEvents = async () => {
    for (const item of seedGatherings) {
        const { cover, gallery, ...fields } = item; // eslint-disable-line no-unused-vars
        await Event.updateOne({ slug: item.slug }, { $set: fields }, { upsert: true, runValidators: true });
    }
    console.log(`🌱 Upserted ${seedGatherings.length} canonical gatherings by slug`);
};

const connectDB = async () => {
    if (isConnectingDb || mongoose.connection.readyState === 1) return;
    isConnectingDb = true;
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');
        await seedInitialEvents();
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        console.error('👉 Please update MONGO_URI in server/.env with your MongoDB Atlas connection string.');
        console.error('   Example: MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/youth-spark-nexus');
        console.error(`↻ Retrying Mongo connection in ${DB_RETRY_MS / 1000}s...`);
        setTimeout(connectDB, DB_RETRY_MS);
    } finally {
        isConnectingDb = false;
    }
};

mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB disconnected. Retrying connection...');
    setTimeout(connectDB, DB_RETRY_MS);
});

connectDB();

// --- JWT Auth Middleware ---
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
    }
};

// =============================================
// PUBLIC ROUTES
// =============================================

// --- Get all published gatherings (public, read-only) ---
app.get('/api/events', async (req, res) => {
    if (!ensureDbConnected(res)) return;
    try {
        const events = await Event.find({
            slug: { $exists: true, $ne: '' },
            program: { $in: Event.PROGRAMS },
        }).sort({ date: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to retrieve gatherings.' });
    }
});

// --- Get one published gathering by slug (public, read-only) ---
app.get('/api/events/:slug', async (req, res) => {
    if (!ensureDbConnected(res)) return;
    try {
        const slug = trimStr(req.params.slug, 120);
        const event = await Event.findOne({ slug, program: { $in: Event.PROGRAMS } });
        if (!event) return res.status(404).json({ success: false, message: 'Gathering not found.' });
        res.json(event);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to retrieve gathering.' });
    }
});

// =============================================
// ADMIN AUTH
// =============================================

// --- Admin Login ---
app.post('/api/admin/login', loginLimiter, async (req, res) => {
    const { username, password } = req.body;

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    if (!adminUsername || !adminPasswordHash) {
        return res.status(500).json({ success: false, message: 'Admin credentials are not configured.' });
    }

    if (username !== adminUsername) {
        return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const passwordMatches = await bcrypt.compare(password, adminPasswordHash);
    if (!passwordMatches) {
        return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Issue JWT (valid for 2 hours)
    const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '2h' });

    return res.json({ success: true, token });
});

// =============================================
// PROTECTED ADMIN ROUTES (require JWT)
// =============================================

// --- Get all gatherings for admin (including legacy un-migrated records) ---
app.get('/api/admin/events', verifyToken, async (req, res) => {
    if (!ensureDbConnected(res)) return;
    try {
        const events = await Event.find().sort({ date: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to retrieve gatherings.' });
    }
});

// --- Create new gathering ---
app.post('/api/events', verifyToken, async (req, res) => {
    if (!ensureDbConnected(res)) return;
    const { data, error } = gatheringFields(req.body || {});
    if (error) return res.status(400).json({ success: false, message: error });
    if (!data.title || !data.date || !isValidDate(data.date) || !data.program) {
        return res.status(400).json({ success: false, message: 'Title, program, and a valid date (YYYY-MM-DD or YYYY-MM) are required.' });
    }

    try {
        data.slug = await uniqueSlug(slugify(data.title));
        const event = await Event.create(data);
        res.status(201).json({ success: true, event });
    } catch (err) {
        console.error('❌ Create gathering failed:', err.message);
        res.status(500).json({ success: false, message: 'Failed to create gathering. Please verify database access and try again.' });
    }
});

// --- Update gathering ---
app.put('/api/events/:id', verifyToken, async (req, res) => {
    if (!ensureDbConnected(res)) return;
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, message: 'Invalid gathering ID.' });
    }
    const { data, error } = gatheringFields(req.body || {});
    if (error) return res.status(400).json({ success: false, message: error });
    if (data.date !== undefined && !isValidDate(data.date)) {
        return res.status(400).json({ success: false, message: 'Invalid date format. Use YYYY-MM-DD or YYYY-MM.' });
    }

    try {
        const existing = await Event.findById(req.params.id);
        if (!existing) return res.status(404).json({ success: false, message: 'Gathering not found.' });
        if (!existing.slug && data.title) {
            data.slug = await uniqueSlug(slugify(data.title));
        }

        const event = await Event.findByIdAndUpdate(
            req.params.id,
            data,
            { new: true, runValidators: true }
        );
        res.json({ success: true, event });
    } catch (err) {
        console.error('❌ Update gathering failed:', err.message);
        res.status(500).json({ success: false, message: 'Failed to update gathering. Please verify database access and try again.' });
    }
});

// --- Delete gathering ---
app.delete('/api/events/:id', verifyToken, async (req, res) => {
    if (!ensureDbConnected(res)) return;
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, message: 'Invalid event ID.' });
    }
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ success: false, message: 'Event not found.' });
        res.json({ success: true, message: 'Event deleted.' });
    } catch (err) {
        console.error('❌ Delete event failed:', err.message);
        res.status(500).json({ success: false, message: 'Failed to delete event. Please verify database access and try again.' });
    }
});

// --- Get all contact submissions (admin only, read-only archive) ---
app.get('/api/admin/contacts', verifyToken, async (req, res) => {
    if (!ensureDbConnected(res)) return;
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to retrieve contacts.' });
    }
});

// --- Verify token validity (used by admin dashboard on load) ---
app.get('/api/admin/verify', verifyToken, (req, res) => {
    res.json({ success: true, admin: req.admin });
});

// --- Health check ---
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
