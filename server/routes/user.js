const express = require('express');
const bcrypt = require('bcrypt');
const userCtrl = require('../controllers/user');
const User = require('../models/user');


const router = express.Router();

router.post('/register', async (req, res) => {
    let user = await userCtrl.insert(req.body);
    login(res, user);
});

router.post('/login', async (req, res, next) => {
    const { password, email } = req.body;
    let user = await User.findOne({ email }, { fullname: 1, email: 1, roles: 1, password:1 });
    if (!user || !bcrypt.compareSync(password, user.password))
        return next('Your login details could not be verified. Please try again.');
    login(res, user);
});

function login(res, user) {
    const u = user.toObject();
    delete u.password;
    res.json({ success: true, data: userCtrl.generateToken(u) });
}

module.exports = router;