const
    express = require('express'),
    usersRouter = new express.Router(),
    passport = require('passport'),
    User = require('../models/user'),
    axios = require('axios'),
    NewsAPI = require('newsapi'),
    newsapi = new NewsAPI('d387655fed4f4541a7970fc4a8cc21f7');

// render login view
usersRouter.get('/login', (req, res) => {
    res.render('login');
});

usersRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login'
}));

// render signup view
usersRouter.get('/signup', (req, res) => {
    res.render('signup', { message: req.flash('/Signup_message') });
});
usersRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup'
}));

// render the user profile only when user is logged in
usersRouter.get('/profile', isLoggedIn, (req, res) => {
   let xx;
    newsapi.v2.everything({
        q: 'bitcoin',
        sources: 'bbc-news,the-verge',
        domains: 'bbc.co.uk, techcrunch.com',
        from: '2018-11-25',
        to: '2018-12-19',
        language: 'en',
        sortBy: 'relevancy',
        page: 2,
        apiKey: 'd387655fed4f4541a7970fc4a8cc21f7'
      }).then(response => {
          xx = response;
        console.log(response);
        console.log(response.status);
        console.log(response.totalResults);
        console.log(response.articles[0].author);
        console.log(response.articles[0].title);
        console.log(response.articles[0].description);
        console.log(response.articles[0].content);
      });
      res.render('profile', { user: req.user, response: req.response});
});

// render info view
usersRouter.get('/profile/info', isLoggedIn, (req, res) => {
    // thisProf = req.user
    res.render('info', { user: req.user});
    // render the user profile only when user is logged in
      
});

usersRouter.patch('/profile', isLoggedIn, (req, res) => {
    // check to see of the request body has a truthy password key(meaning user is trying to modify password)
    if (!req.body.password) delete req.body.password;
    Object.assign(req.user, req.body);
    req.user.save((err, updatedUser) => {
        if (err) console.log(err);
        res.redirect('/users/profile');
    });
});

usersRouter.get('/profile/delete', isLoggedIn, (req, res) => {
    res.render('deleteprofile');
});
usersRouter.delete('/profile', isLoggedIn, (req, res) => {
    User.findByIdAndRemove(req.user._id,(err, deletedUser) => {
        if (err) return res.status(500).send(err);
        res.redirect('/users/signup');
    });
});

usersRouter.get('/profile/edit', isLoggedIn, (req, res) => {
    res.render('editProfile');
});

usersRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) return next();
    res.redirect('/users/login');
};

module.exports = usersRouter;