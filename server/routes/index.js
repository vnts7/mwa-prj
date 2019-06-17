const express = require('express');
const authRequire = require('../middleware/auth-require');

const router = express.Router();

//Add route here
router.use('/user', require('./user'));
//authRequire route
//outer.use('/profile', authRequire, require('./profile'));

//TODO skip security check during developing
router.use('/profile', require('./profile'));



module.exports = router;