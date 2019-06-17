const express = require('express');

const router = express.Router();

//Add route here
router.use('/user', require('./user'));

router.use('/tracker', require('./tracker'));

module.exports = router;