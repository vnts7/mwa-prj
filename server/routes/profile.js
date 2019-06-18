const express = require('express');
const profileController = require('../controllers/profile.controller')
const router = express.Router();
const User = require('../models/user');
var moment = require('moment');

router.get('/check', async (req, res) => {
  res.json({ success: true })
});

router.get('/:username', async  (req, res) => {  
  let data = await profileController.findByUserName(req.params['username']); 
   
  // data.bmi = profileController.bmi(req)
    
  res.json(data);
});

router.put('/', async (req, res, next) => {
  console.log("req.body: ", req.body)
  data = req.body;
  // convert input from YYYY-MM-DD to moment value
  data.dateOfBirth = moment(data.dateOfBirth, 'YYYY-MM-DD').unix();
  bmr = profileController.bmr(data);
  data.bmr = bmr;
  caloriesNeed = profileController.caloriesNeed(data);
  data.bmi = profileController.bmi(data);
  data.calorieNeeds = caloriesNeed;

  console.log("data to upated DB ", data);

  let user = await profileController.updateProfile(data); 
  // 'updated user: ', user 
  if (user & user.n==1) {
    res.status(200).json({success : "true", message: "Update successful!" });
  }
  res.status(204).json({ success : "false", message: "Not successful!" });
}); 

module.exports = router;