const mongoose = require('mongoose');

const PROGRAMS = ['youth-spark-summit', 'youth-spark-nexus', 'nxt-africa-forum', 'reconstructive-leadership', 'let-her', 'becoming-limitless'];

// A gathering is something we hosted (status "held") or will host ("upcoming").
// The public site only lists records that have both a slug and a program.
const eventSchema = new mongoose.Schema({
    slug: { type: String, trim: true, maxlength: 120, index: { unique: true, sparse: true } },
    program: { type: String, enum: [...PROGRAMS, ''], default: '' },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    // YYYY-MM-DD, or YYYY-MM when only the month is known (datePrecision 'month').
    date: { type: String, required: true, maxlength: 20 },
    datePrecision: { type: String, enum: ['day', 'month'], default: 'day' },
    time: { type: String, default: '', maxlength: 80 },
    venue: { type: String, default: '', maxlength: 300 },
    status: { type: String, enum: ['held', 'upcoming'], default: 'held' },
    summary: { type: String, default: '', maxlength: 2000 },
    details: { type: [String], default: [] },
    poster: { type: String, default: '', maxlength: 500 },
    cover: { type: String, default: '', maxlength: 500 },
    gallery: { type: [String], default: [] },
    // The single primary film (livestream or full recording).
    youtubeUrl: { type: String, default: '', maxlength: 500 },
    instagramUrl: { type: String, default: '', maxlength: 500 },
    // Extra films shown under "More from this gathering".
    videos: {
        type: [new mongoose.Schema({
            label: { type: String, required: true, trim: true, maxlength: 200 },
            url: { type: String, required: true, trim: true, maxlength: 500 },
        }, { _id: false })],
        default: [],
    },
    // Names shown under "Speakers on the official highlights". Names only.
    speakers: { type: [String], default: [] },
    // Kept so older records still load. Not used by the public site.
    description: { type: String, default: '', maxlength: 2000 },
    location: { type: String, default: '', maxlength: 200 },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
module.exports.PROGRAMS = PROGRAMS;
