const Goal = require('../models/goals'),
      User = require('../models/user');

module.exports = {
    index: (req, res) => {
        Goal.find({}, (err, goals) => {
            if (err) res.json({ success: false});
            res.render('goals', { success: true, goals});
        })
    },
    newgoal: (req, res) => {
            res.render('creategoal');
    },
    create: (req, res) => {
        Goal.create(req.body, (err, newGoal) => {
            req.user.goals.push(newGoal._id)
            console.log(req.user.goals);
            // Object.assign(req.user.goals, req.body);
            req.user.save((err, updatedUser) => {
                if (err) console.log(err);
                res.json({success: true, updatedUser});
            });
            
            // if (err) res.json({ success: false , err});
            // res.redirect('/users/profile/goals');
        });
        
    },
    show: (req, res) => {
        Goal.findById(req.params.id, (err, goal) => {
            console.log(goal);
            if (err) res.json({ success: false , err});
            res.render('createGoal', { success: true, goal});
        });
        
    },
    edit: (req, res) => {
        Goal.findById(req.params.id, (err, goal) => {
            console.log(goal);
            if (err) res.json({ success: false , err});
            res.render('editGoal', {goal} );
        });
        
    },
    update: (req, res) => {
        Goal.findByIdAndUpdate(req.params.id, req.body, (err, updatedProfile) => {
            console.log("hi")
            if (err) res.json({ success: false , err});
            res.redirect('/users/profile/goals');
        });
    },
    destroy: (req, res) => {
        Goal.findByIdAndDelete(req.params.id, (err, deletedGoal) => {
            
            if (err) res.json({ success: false});
            res.redirect('/users/profile/goals');
        });
    }
}

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) return next();
    res.redirect('/users/login');
};