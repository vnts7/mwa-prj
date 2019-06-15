const express = require('express');
const userCtrl = require('../controllers/user');

const router = express.Router();


router.post('/', async (req, res) => {
    let data = await userCtrl.insert(req.body);
    res.json({ success: true, data });
})

module.exports = router;