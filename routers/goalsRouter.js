const 
    express = require('express'),
    Goal = require('../models/goals'),
    goalsRouter = new express.Router();

// routers
goalsRouter.post('/', (req, res) => {
    Goal.create(req.body, (err, newGoal) => {
        if (err) res.json({ success: false, err});
                 res.json({ success: true, newGoal});
    })
});
goalsRouter.get('/', (req, res) => {
    Goal.find({}, (err, goals) => {
        if (err) res.json({ success: false, err});
        res.json({ success: true, goals});
    })
});
goalsRouter.get('/:id', (req, res) => {
    Goal.findById(req.params.id, (err, goal) => {
        if (err) res.json({ success: false, err});
        res.json({ success: true, goal});
    })
});
goalsRouter.patch('/:id', (req, res) => {
    Goal.findByIdAndUpdate(req.params.id, req.body, (err, updatedGoal) => {
        if (err) res.json({ success: false, err});
        res.json({ success: true, updatedGoal});
    })
});
goalsRouter.delete('/:id', (req, res) => {
    Goal.findByIdAndDelete(req.params.id, (err, deletedGoal) => {
        if (err) res.json({ success: false, err});
        res.json({ success: true, deletedGoal});
    })
});

module.exports = goalsRouter;




