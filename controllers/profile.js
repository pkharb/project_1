const Profile = require('../models/profile');

module.exports = {
    index: (req, res) => {
        Profile.find({}, (err, profiles) => {
            if (err) res.json({ success: false});
            res.json({ success: true, profiles});
        })
    },
    create: (req, res) => {
        Profile.create(req.body, (err, newProfile) => {
            
            if (err) res.json({ success: false , err});
                     res.json({ success: true, newProfile});
        });
        
    },
    show: (req, res) => {
        Profile.findById(req.params.id, (err, profile) => {
            
            if (err) res.json({ success: false , err});
                     res.json({ success: true, profile});
        });
        
    },
    destroy: (req, res) => {
        Profile.findByIdAndDelete(req.params.id, (err, deletedProfile) => {
            
            if (err) res.json({ success: false , err});
                     res.json({ success: true, deletedProfile});
        });
        
    }
}