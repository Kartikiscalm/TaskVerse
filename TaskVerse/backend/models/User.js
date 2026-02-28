const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    xp: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    currency: { type: Number, default: 0 },
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
