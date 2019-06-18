const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Tracker = require('../models/tracker');

router.get('/check', async (req, res) => {
  res.json({ success: true })
});

router.get('/chart/:id', (req, res) => {
  var time = Number(req.query.date);  
  let userId = mongoose.Types.ObjectId(req.params.id); 
  console.log(time)
  Tracker.aggregate([
      {$match : {userId: userId, date : {$gte : time} }   } 
      , { "$unwind": "$meals" }
      , {$group: { "_id": { date: "$date"}, calorieNeeds : {$first : "$calorieNeeds"},  sumTakenCalorie: {$sum: "$meals.calories" } } }
      , {$project : {date : "$_id.date", calorieNeeds : "$calorieNeeds" , sumTakenCalorie : "$sumTakenCalorie" } }
      , {$sort : {date : 1} }
    ], 
    function(err, result) {
        console.log('Calories Need & Taken : ', result);
        res.json(result);
  }); 
} )

module.exports = router;