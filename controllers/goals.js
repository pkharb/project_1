const Goal = require('../models/goals');

module.exports = {
    index: (req, res) => {
        Goal.find({}, (err, goals) => {
            if (err) res.json({ success: false});
            res.render('goals', { success: true, goals});
        })
    },
    create: (req, res) => {
        Goal.create(req.body, (err, newGoal) => {
            
            if (err) res.json({ success: false , err});
            res.render('createGoal', { success: true, newGoal});
        });
        
    },
    show: (req, res) => {
        Goal.findById(req.params.id, (err, goal) => {
            
            if (err) res.json({ success: false , err});
                    //  res.json({ success: true, profile});
            res.render('createGoal', { success: true, goal});
        });
        
    },
    update: (req, res) => {
        Goal.findByIdAndUpdate(req.params.id, req.body, (err, updatedProfile) => {
            
            if (err) res.json({ success: false , err});
            res.json({ success: true, updatedProfile});
        });
        
    },
    destroy: (req, res) => {
        Goal.findByIdAndDelete(req.params.id, (err, deletedProfile) => {
            
            if (err) res.json({ success: false , err});
                     res.json({ success: true, deletedProfile});
        });
        
    }
}

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) return next();
    res.redirect('/users/login');
};