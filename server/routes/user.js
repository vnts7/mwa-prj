const express = require('express');
const userCtrl = require('../controllers/user');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    let user = await userCtrl.insert(req.body);
    login(res, user);
});

router.post('/login', async (req, res) => {
    const { password, email } = req.body;
    let user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password))
        return next('Your login details could not be verified. Please try again.');
    login(res,user);
});

function login(res, user) {
    user = user.toObject();
    delete user.password
    res.json({ success: true, data: userCtrl.generateToken(user) });
}

module.exports = router;