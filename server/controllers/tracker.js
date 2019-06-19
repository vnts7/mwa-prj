const Tracker = require('../models/tracker');
const User = require('../models/user');
const mongoose = require('mongoose');


async function fromUser(userId) {
  let o = await User.findById(userId, { weight: 1, calorieNeeds: 1, goal: 1, _id: 0 });
  o = o.toObject();
  o.meals = [];
  o.calorieIntake = 0;
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
  o.meals.unshift(meal);
  o.calorieIntake += meal.calories * meal.quantity;
  return await o.save();
}

async function removeMeal(userId, date, mealId) {
  let o = await Tracker.findOne({ userId, date });
  let meal = o.meals.find(i => i._id == mealId);
  o.calorieIntake -= meal.calories * meal.quantity;
  o.meals = o.meals.filter(i => i._id != mealId);
  return await o.save();
}

async function findByDate(userId, date) {
  let o = await Tracker.findOne({ userId, date });
  if (!o) o = await fromUser(userId);
  return o;
}

async function findFromDate(userId, date) {
  return await Tracker.find({ userId, date: { $gte: date } }, { meals: false });
}

module.exports = {
  addMeal,
  findByDate,
  removeMeal,
  findFromDate
}