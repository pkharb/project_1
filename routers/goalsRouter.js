const 
    express = require('express'),
    Goal = require('../models/goals'),
    goals = require('../controllers/goals')
    goalsRouter = new express.Router();

// routers
// goalsRouter.post('/', (req, res) => {
    
    
//     res.render('signup', { message: req.flash('/Signup_message') });
   
// });
// goalsRouter.get('/goals', (req, res) => {
//     Goal.find({}, (err, goals) => {
//         if (err) console.log(err);
//         res.redirect('/users/profile/goals');
//     })
    
    
// });

goalsRouter.get('/goals', goals.index);
goalsRouter.post('/goals', goals.create);



// goalsRouter.get('/:id', (req, res) => {
//     Goal.findById(req.params.id, (err, goal) => {
//         if (err) res.json({ success: false, err});
//         res.json({ success: true, goal});
//     })
// });
// goalsRouter.patch('/:id', (req, res) => {
//     Goal.findByIdAndUpdate(req.params.id, req.body, (err, updatedGoal) => {
//         if (err) res.json({ success: false, err});
//         res.json({ success: true, updatedGoal});
//     })
// });
// goalsRouter.delete('/:id', (req, res) => {
//     Goal.findByIdAndDelete(req.params.id, (err, deletedGoal) => {
//         if (err) res.json({ success: false, err});
//         res.json({ success: true, deletedGoal});
//     })
// });

// function isLoggedIn(req, res, next){
//     if (req.isAuthenticated()) return next();
//     res.redirect('/users/login');
// };

module.exports = goalsRouter;




