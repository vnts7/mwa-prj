const express = require('express');
const bcrypt = require('bcrypt');
const userCtrl = require('../controllers/user');

const router = express.Router();

router.post('/register', async (req, res, next) => {
    let user = await userCtrl.findByEmail(req.body.email);
    if (user) return next(req.body.email + ' has been taken!')
    user = await userCtrl.insert(req.body);
    login(res, user);
});

router.post('/login', async (req, res, next) => {
    const { password, email } = req.body;
    let user = await userCtrl.findByEmail(email);
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