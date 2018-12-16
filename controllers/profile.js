const Profile = require('../models/profile');

module.exports = {
    create: (req, res) => {
        Profile.create(req.body, (err, newProfile) => {
            if (err) res.json({ success: false , err});
                     res.json({ success: true, newProfile});
        });
        
    }
}