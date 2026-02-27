const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
    category: { type: String, enum: ['Academics', 'Clubs', 'Personal Growth', 'Leisure'], required: true },
    completed: { type: Boolean, default: false },
    totalDays: { type: Number, default: 1 },
    completedDays: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
