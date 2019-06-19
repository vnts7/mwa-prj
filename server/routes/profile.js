const express = require('express');
const ct = require('../controllers/profile.controller');
const router = express.Router();
const User = require('../models/user');

router.get('/check', async (req, res) => {
  res.json({ success: true })
});

router.get('/', async  (req, res) => {  
  let data = await User.findById(req.user._id);
  res.json({ success: true, data });
});

router.put('/', async (req, res, next) => {
  const data = await ct.updateProfile(req.user._id, req.body);
  res.json({ success: true, data });
}); 

module.exports = router;