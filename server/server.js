const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Models
const Event = require('./models/Event');
const Contact = require('./models/Contact');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// --- Middleware ---
app.use(cors());
app.use(express.json());

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
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' });
    }

    try {
        await Contact.create({ name, email, message });
        console.log(`[Contact Form] ${name} (${email}): ${message}`);
        return res.status(200).json({ success: true, message: 'Message received successfully! We will get back to you.' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to save your message.' });
    }
});

// =============================================
// ADMIN AUTH
// =============================================

// --- Admin Login ---
app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    // Validate credentials
    if (username !== adminUsername || password !== adminPassword) {
        return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Issue JWT (valid for 8 hours)
    const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });

    return res.json({ success: true, token });
});

// =============================================
// PROTECTED ADMIN ROUTES (require JWT)
// =============================================

// --- Create new event ---
app.post('/api/events', verifyToken, async (req, res) => {
    const { title, date, description, location } = req.body;

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
    const { title, date, description, location } = req.body;

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
