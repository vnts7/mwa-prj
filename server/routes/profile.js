const express = require('express');
const profileController = require('../controllers/profile')
const router = express.Router();
const User = require('../models/user');

router.get('/check', async (req, res) => {
  res.json({ success: true })
});

 router.get('/:username', async  (req, res) => {
  await User.findOne({email : req.params['username']}).then( result => {
    if (result) { 
      res.status(200).json(result);
    } else {
      res.status(404).json({ success : "false", message: "not found!", data :{} });
    }
  }) 
 
});


module.exports = router;