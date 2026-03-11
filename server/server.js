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
const Registration = require('./models/Registration');

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

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
});

// Simple validation helpers
const isValidEmail = (s) => typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim()) && s.length <= 254;
const isValidObjectId = (id) => id && mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === String(id);
const trimStr = (s, max) => (typeof s === 'string' ? s.trim().slice(0, max) : '');

// --- MongoDB Connection ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');
        // Seed initial events if none exist
        const count = await Event.countDocuments();
        if (count === 0) {
            await Event.insertMany([
                { title: 'Youth Spark Summit', date: '2026-03-14', description: 'Annual event in Nairobi CBD.', location: 'Nairobi CBD' },
                { title: 'Youth Spark Nexus Session', date: '2026-04-10', description: 'Monthly networking and leadership session.', location: 'Nairobi' },
            ]);
            console.log('🌱 Seeded initial events');
        }
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        console.error('👉 Please update MONGO_URI in server/.env with your MongoDB Atlas connection string.');
        console.error('   Example: MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/youth-spark-nexus');
        // Do not exit — server continues running (routes still register, DB calls will fail gracefully)
    }
};

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

// --- Get all events (public, read-only) ---
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to retrieve events.' });
    }
});

// --- Contact Form Submission (public) ---
app.post('/api/contact', contactLimiter, async (req, res) => {
    const raw = req.body || {};
    const name = trimStr(raw.name, 120);
    const email = trimStr(raw.email, 254);
    const message = trimStr(raw.message, 2000);

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    try {
        await Contact.create({ name, email, message });
        console.log(`[Contact Form] submission from ${email}`);
        return res.status(200).json({ success: true, message: 'Message received successfully! We will get back to you.' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to save your message.' });
    }
});

// --- Event Registration (public) ---
app.post('/api/registrations', async (req, res) => {
    const raw = req.body || {};
    const eventId = raw.eventId;
    const name = trimStr(raw.name, 120);
    const email = trimStr(raw.email, 254);

    if (!eventId || !name || !email) {
        return res.status(400).json({ success: false, message: 'Please provide eventId, name, and email.' });
    }
    if (!isValidObjectId(eventId)) {
        return res.status(400).json({ success: false, message: 'Invalid event.' });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    try {
        await Registration.create({ eventId, name, email });
        return res.status(200).json({ success: true, message: 'Successfully registered for the event!' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to register for the event.' });
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

// --- Create new event ---
app.post('/api/events', verifyToken, async (req, res) => {
    const raw = req.body || {};
    const title = trimStr(raw.title, 200);
    const date = trimStr(raw.date, 20);
    const description = trimStr(raw.description, 2000);
    const location = trimStr(raw.location, 200);

    if (!title || !date) {
        return res.status(400).json({ success: false, message: 'Title and date are required.' });
    }

    try {
        const event = await Event.create({ title, date, description, location });
        res.status(201).json({ success: true, event });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create event.' });
    }
});

// --- Update event ---
app.put('/api/events/:id', verifyToken, async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, message: 'Invalid event ID.' });
    }
    const raw = req.body || {};
    const title = trimStr(raw.title, 200);
    const date = trimStr(raw.date, 20);
    const description = trimStr(raw.description, 2000);
    const location = trimStr(raw.location, 200);

    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { title, date, description, location },
            { new: true, runValidators: true }
        );

        if (!event) return res.status(404).json({ success: false, message: 'Event not found.' });
        res.json({ success: true, event });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update event.' });
    }
});

// --- Delete event ---
app.delete('/api/events/:id', verifyToken, async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, message: 'Invalid event ID.' });
    }
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ success: false, message: 'Event not found.' });
        res.json({ success: true, message: 'Event deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete event.' });
    }
});

// --- Get all contact submissions (admin only) ---
app.get('/api/admin/contacts', verifyToken, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to retrieve contacts.' });
    }
});

// --- Get all registrations (admin only) ---
app.get('/api/admin/registrations', verifyToken, async (req, res) => {
    try {
        const registrations = await Registration.find().populate('eventId', 'title').sort({ createdAt: -1 });
        res.json(registrations);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to retrieve registrations.' });
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
