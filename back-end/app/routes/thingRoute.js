const router = require('express').Router();
const thingController = require('../controllers/thingController');

router.post('/', thingController.create);
router.get('/', thingController.findAll);
router.get('/:id', thingController.findOne);
router.put('/:id', thingController.update);

module.exports = router;
