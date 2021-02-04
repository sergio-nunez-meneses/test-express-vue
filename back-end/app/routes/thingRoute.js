const router = require('express').Router();
const thingController = require('../controllers/thingController');

router.post('/', thingController.create);

module.exports = router;
