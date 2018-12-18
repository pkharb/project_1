const
    express = require('express'),
    profileRouter = new express.Router(),
    passport = require('passport'),
    Profile = require('../models/profile');

// render login view
profileRouter.get('/login', (req, res) => {
    res.render('login');
});

profileRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/login'
}));

// render signup view
profileRouter.get('/signup', (req, res) => {
    res.render('/signup', { message: req.flash('/Signup_message') });
});
profileRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup'
}));

profileRouter.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { profile: req.profile});
    // render the user profile only when user is logged in
});

profileRouter.patch('/profile', isLoggedIn, (req, res) => {
    // check to see of the request body has a truthy password key(meaning user is trying to modify password)
    if (!req.body.password) delete req.body.password;
    Object.assign(req.profile, req.body);
    req.profile.save((err, updatedProfile) => {
        if (err) console.log(err);
        res.redirect('/user/profile');
    });
});

profileRouter.get('/profile/delete', isLoggedIn, (req, res) => {
    res.render('deleteprofile');
});
profileRouter.delete('/profile', isLoggedIn, (req, res) => {
    Profile.findByIdAndRemove(req.profile._id,(err, deletedProfile) => {
        if (err) return res.status(500).send(err);
        res.redirect('/user/signup');
    });
});

profileRouter.get('/profile/edit', isLoggedIn, (req, res) => {
    res.render('editprofile');
});

profileRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) return next();
    res.redirect('/user/login');
};

module.exports = profileRouter;