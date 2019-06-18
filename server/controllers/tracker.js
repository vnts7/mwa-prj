const Tracker = require('../models/tracker');
const User = require('../models/user');
const mongoose = require('mongoose');


async function fromUser(userId) {
  let o = await User.findById(userId, { weight: 1, calorieNeeds: 1, goal: 1, _id: 0 });
  o = o.toObject();
  o.meals = [];
  return o;
}

async function addMeal(userId, date, meal) {
  let o = await Tracker.findOne({ userId, date });
  if (!o) {
    o = await fromUser(userId);
    o.userId = userId;
    o.date = date;
    console.log(o);
    o = await new Tracker(o).save();
  }
  meal._id = mongoose.Types.ObjectId();
  o.meals.push(meal);
  await o.save();
  return meal;
}
async function findByDate(userId, date) {
  let o = await Tracker.findOne({ userId, date });
  if (!o) o = await fromUser(userId);
  return o;
}
module.exports = {
  addMeal,
  findByDate,
}