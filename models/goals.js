const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    name: String,
    duration: String,
    cost: String,
    status: Number
}, { timestamps: true });

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;