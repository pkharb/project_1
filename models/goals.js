const mongoose = require('mongoose');

const goalsSchema = new mongoose.Schema({
    name: String,
    duration: String,
    cost: String,
    status: Number
}, { timestamps: true });

const Goal = mongoose.model('Goal', goalsSchema);
module.exports = Goal;