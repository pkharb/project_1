const 
    express = require('express'),
    Goal = require('../models/goals'),
    goals = require('../controllers/goals')
    goalsRouter = new express.Router();

goalsRouter.get('/goals', isLoggedIn, goals.index);
goalsRouter.get('/goals/creategoal', isLoggedIn, goals.newgoal);
goalsRouter.post('/goals', isLoggedIn, goals.create);
goalsRouter.get('/goals/:id', isLoggedIn, goals.show);
goalsRouter.get('/goals/:id/edit', isLoggedIn, goals.edit);
goalsRouter.patch('/goals/:id', isLoggedIn, goals.update);
goalsRouter.delete('/goals/:id', isLoggedIn, goals.destroy);

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) return next();
    res.redirect('/users/login');
};

module.exports = goalsRouter;




