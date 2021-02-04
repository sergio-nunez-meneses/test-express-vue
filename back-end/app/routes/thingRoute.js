const router = require('express').Router();
const thingController = require('../controllers/thingController');

router.post('/', thingController.create);
router.get('/', thingController.findAll);

module.exports = router;
