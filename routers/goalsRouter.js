const 
    express = require('express'),
    router = express.Router(),
    Goal = require('../controllers/goals');

// routers
router.post('/', Goal.create);
router.get('/', Goal.index);

module.exports = router;
