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
    res.render('signup', { message: req.flash('Welcome to TIE') });
});
usersRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup'
}));

// render the user profile only when user is logged in
usersRouter.get('/profile', isLoggedIn, (req, res) => {
   let myArticles;
   // dynamically set the last one week's articles
   // dynamically set the last one week's articles
   var today = new Date();
   let startDate;
   var dd = today.getDate();
   var mm = today.getMonth()+1; //January is 0!
   var yyyy = today.getFullYear();
   if(dd<10) {
       dd = '0'+dd
   } 
   if(mm<10) {
       mm = '0'+mm
   } 
   today = yyyy + '-' + mm + '-' + dd;
   let sd = dd - 20;
   startDate = yyyy + '-' + mm + '-' + sd;
   // sometime articles will retuen empty because in the given period
   // there are no new articles on the selected topic, increase the range 
   // and soem articles will be returned which will have content
    newsapi.v2.everything({
        q: 'bitcoin',
        sources: 'bbc-news,the-verge',
        domains: 'bbc.co.uk, techcrunch.com',
        from: startDate,
        to: today,
        language: 'en',
        sortBy: 'relevancy',
        page: 2,
        apiKey: 'd387655fed4f4541a7970fc4a8cc21f7'
      }).then(response => {
          console.log(response);
          myArticles = response;
        res.render('profile', { user: req.user, myArticles});
    });
});

// render edit profile view
usersRouter.get('/profile/edit', isLoggedIn, (req, res) => {
    res.render('editProfile');
});

// edit user profile
usersRouter.patch('/profile', isLoggedIn, (req, res) => {
    // check to see of the request body has a truthy password key(meaning user is trying to modify password)
    if (!req.body.password) delete req.body.password;
    Object.assign(req.user, req.body);
    req.user.save((err, updatedUser) => {
        if (err) console.log(err);
        res.redirect('/users/profile');
    });
});

// render delete profile view
usersRouter.get('/profile/delete', isLoggedIn, (req, res) => {
    res.render('deleteProfile');
});

// delete profile 
usersRouter.delete('/profile', isLoggedIn, (req, res) => {
    User.findByIdAndRemove(req.user._id,(err, deletedUser) => {
        if (err) return res.status(500).send(err);
        res.redirect('/users/signup');
    });
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