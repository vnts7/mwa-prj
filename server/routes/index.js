const express = require('express');

const router = express.Router();

//Add route here
router.use('/user', require('./user'));

module.exports = router;