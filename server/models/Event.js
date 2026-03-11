const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxlength: 200 },
    date: { type: String, required: true, maxlength: 20 },
    description: { type: String, default: '', maxlength: 2000 },
    location: { type: String, default: '', maxlength: 200 },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
