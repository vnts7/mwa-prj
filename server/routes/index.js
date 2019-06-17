const express = require('express');
const authRequire = require('../middleware/auth-require');

const router = express.Router();

//Add route here
router.use('/user', require('./user'));
//authRequire route
router.use('/profile', authRequire, require('./profile'));

module.exports = router;