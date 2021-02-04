const router = require('express').Router();
const thingController = require('../controllers/thingController');

router.post('/', thingController.create);
router.get('/', thingController.findAll);
router.get('/:id', thingController.findOne);
router.put('/:id', thingController.update);
router.delete('/:id', thingController.delete);
router.delete('/', thingController.deleteAll);

module.exports = router;
