const mongoose = require('mongoose'),
bcrypt = require('bcrypt-nodejs');


const profileSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
}, { timestamps:true });

profileSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(8, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        } )
    })
})

profileSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;

