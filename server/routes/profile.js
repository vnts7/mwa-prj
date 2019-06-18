const express = require('express');
const profileController = require('../controllers/profile.controller')
const router = express.Router();
const User = require('../models/user');

router.get('/check', async (req, res) => {
  res.json({ success: true })
});

router.get('/:username', async  (req, res) => {  
  let data = await profileController.findByUserName(req.params['username']);
  // BMI = (Weight in Kilograms / (Height in Meters x Height in Meters))
  try {
    if (data && !data.bmi) {
      data.bmi = data.weight / ( Number(data.height) * Number(data.height))
    }
  } catch(err) {console.log('skip calculating BMI', err)} 
  res.json(data);
});

router.put('/', async (req, res, next) => {
  let user = await profileController.updateProfile(req.body); 
  // 'updated user: ', user 
  if (user & user.n==1) {
    res.status(200).json({success : "true", message: "Update successful!" });
  }
  res.status(204).json({ success : "false", message: "Not successful!" });
}); 

module.exports = router;