const
    express = require('express'),
    userRouter = new express.Router(),
    passport = require('passport'),
    User = require('../models/user');

// render login view
userRouter.get('/login', (req, res) => {
    res.render('login');
});

userRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/login'
}));

// render signup view
userRouter.get('/signup', (req, res) => {
    res.render('signup', { message: req.flash('/Signup_message') });
});
userRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup'
}));

userRouter.get('/user', isLoggedIn, (req, res) => {
    // thisProf = req.user
    res.render('profile', { user: req.user});
    // render the user profile only when user is logged in
});

userRouter.patch('/profile', isLoggedIn, (req, res) => {
    // check to see of the request body has a truthy password key(meaning user is trying to modify password)
    if (!req.body.password) delete req.body.password;
    Object.assign(req.user, req.body);
    req.user.save((err, updatedUser) => {
        if (err) console.log(err);
        res.redirect('/user/profile');
    });
});

userRouter.get('/user/delete', isLoggedIn, (req, res) => {
    res.render('deleteuser');
});
userRouter.delete('/profile', isLoggedIn, (req, res) => {
    User.findByIdAndRemove(req.user._id,(err, deletedUser) => {
        if (err) return res.status(500).send(err);
        res.redirect('/user/signup');
    });
});

userRouter.get('/user/edit', isLoggedIn, (req, res) => {
    res.render('editUser');
});

userRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) return next();
    res.redirect('/profile/login');
};

module.exports = userRouter;