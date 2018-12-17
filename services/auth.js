const 
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Profile = require('../models/profile');

passport.serializeUser((profile, done) => {
    done(null, profile.id)
});

passport.deserializeUser((id, done) => {
    Profile.findById(id, (err, profile) => {
        done(err, profile)
    })
});

// LOCAL SIGNUP ACTION
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    Profile.findOne({ email }, (err, profile) => {
        if (err) return done(err);
        if (profile) return done(null, false, req.flash('signup_message', 'This email is already taken'));

        Profile.create(req.body, (err, newProfile) => {
            if (err) return console.log(err);
            return done(null, newProfile, null);
        })
    })
    
}))

// LOCAL LOGIN ACTION
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    Profile.findOne({ email }, (err, profile) => {
        if (err) return done(err);
        if (!profile || !profile.validPassword(password)) return done(null, false);

        return done(null, profile);
    });
}));

module.exports = passport;