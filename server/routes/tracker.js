const express = require('express');

const trackerController = require('../controllers/tracker.controller');
const authentication = require('../middleware/auth-require');

const router = express.Router();

router.post('/', authentication, trackerController.addTracker);

router.post('/add-food', authentication, trackerController.addFood);

router.patch('/remove-food', authentication, trackerController.removeFood);

router.get('/', authentication, trackerController.getDailyTracker);

router.delete('/', authentication, trackerController.removeTracker);

router.delete('/clear', authentication, trackerController.clearAllTrackers);

module.exports = router;