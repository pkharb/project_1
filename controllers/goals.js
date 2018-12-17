const Goal = require('../models/goals');

module.exports = {
    create: (req, res) => {
        Goal.create(req.body, (err, newGoal) => {
            if (err) res.json({ success: false, err});
                     res.json({ success: true, newGoal});
        })
    },
    index: (req, res) => {
        Goal.find({}, (err, goals) => {
            if (err) res.json({ success: false, err});
            res.json({ success: true, goals});
        })
    }
}