const mongoose = require('mongoose');

const goalsSchema = new mongoose.Schema({
    name: String,
    duration: String,
    cost: String,
    status: Number
}, { timestamps: true });

module.exports = goalsSchema;