const
    express = require('express'),
    Profile = require('../controllers/profile'),
    router = express.Router();

// Profile router
router.post('/', Profile.create);
router.get('/', Profile.index);
router.get('/:id', Profile.show);
router.delete('/:id', Profile.destroy);

module.exports = router;