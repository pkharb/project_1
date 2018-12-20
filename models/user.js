const 
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    goalsSchema = require('./goals')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    goals : [goalsSchema]
}, { timestamps:true });

userSchema.pre('save', function(next) {
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

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;

