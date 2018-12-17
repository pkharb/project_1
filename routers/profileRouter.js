const
    express = require('express'),
    Profile = require('../controllers/profile'),
    router = express.Router();

// Profile router
router.post('/', Profile.create);
router.get('/', Profile.index);
router.get('/:id', Profile.show);

module.exports = router;