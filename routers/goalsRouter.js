const 
    express = require('express'),
    Goal = require('../controllers/goals'),
    router = express.Router();

// routers
router.post('/', Goal.create);
router.get('/', Goal.index);
router.get('/:id', Goal.show);
router.patch('/:id', Goal.update);
router.delete('/:id', Goal.destroy);

module.exports = router;
