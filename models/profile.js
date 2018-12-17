const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
}, { timestamps:true });

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;

