const mongoose = require('mongoose');

const goalsSchema = new mongoose.Schema({
    name: String,
    duration: String,
    cost: String,
    status: Number,
    user: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User' }
}, { timestamps: true });

const Goal = mongoose.model('Goal', goalsSchema);
module.exports = Goal;