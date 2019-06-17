const express = require('express');

const trackerController = require('./controllers/tracker.controller');
const authentication = require('./config/authentication');

const router = express.Router();

router.post('/tracker', authentication, trackerController.addTracker);

router.post('/tracker/addFood', authentication, trackerController.addFood);

router.get('/tracker', authentication, trackerController.getDailyTracker);

module.exports = router;