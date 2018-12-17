const 
    express = require('express'),
    router = express.Router(),
    Goal = require('../controllers/goals');

// routers
router.post('/', Goal.create);
router.get('/', Goal.index);
router.get('/:id', Goal.show);
router.patch('/:id', Goal.update);

module.exports = router;
