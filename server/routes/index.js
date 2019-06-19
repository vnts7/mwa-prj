const express = require('express');
const authRequire = require('../middleware/auth-require');

const router = express.Router();

//Add route here
router.use('/user', require('./user'));
//authRequire route
//outer.use('/profile', authRequire, require('./profile'));

//TODO skip security check during developing
router.use('/profile', authRequire, require('./profile'));



router.use('/search', require('./search'));

router.use('/tracker', authRequire, require('./tracker'));

module.exports = router;