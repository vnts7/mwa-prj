const User = require('../models/user');
var moment = require('moment');


async function updateProfile(userId, data) {
  const o = await User.findById(userId);
  Object.assign(o, data);
  o.bmr = bmr(o);
  o.calorieNeeds = caloriesNeed(o);
  o.bmi = bmi(o);

  return await o.save();
  // return await User.updateOne({ _id: user._id }, user);
}

function bmi(data) {
  try {
    if (data) {
      rs = data.weight / (data.height * data.height)
      return Math.ceil(rs)
    }
  } catch (err) { console.log('skip calculating BMI', err) }
  return '';
}

// Women: BMR = 655 + (9.6 x weight in kg) + (1.8 x height in cm) - (4.7 x age in years)
// Men: BMR = 66 + (13.7 x weight in kg) + (5 x height in cm) - (6.8 x age in years)
function bmr(data) {
  let dateOfBirth = data.dateOfBirth;
  yearOfBirth = moment.unix(dateOfBirth).format('YYYY');

  age = moment().format('YYYY') - yearOfBirth;

  let bmr = 0;
  if (data.gender == 1) {
    bmr = 655 + (9.6 * data.weight) + (1.8 * data.height) - (4.7 * age)
  }
  if (data.gender == 0) {
    bmr = 66 + (13.7 * data.weight) + (5 * data.height) - (6.8 * age)
  }
  return bmr ? Math.ceil(bmr) : '';
}

// 1. If you are sedentary (little or no exercise) : Calorie-Calculation = BMR x 1.2
// 2. If you are lightly active (light exercise/sports 1-3 days/week) : Calorie-Calculation = BMR x 1.375
// 3. If you are moderatetely active (moderate exercise/sports 3-5 days/week) : Calorie-Calculation = BMR x 1.55
// 4. If you are very active (hard exercise/sports 6-7 days a week) : Calorie-Calculation = BMR x 1.725
// 5. If you are extra active (very hard exercise/sports & physical job or 2x training) : Calorie-Calculation = BMR x 1.9

function caloriesNeed(data) {

  array = [1.2, 1.375, 1.55, 1.725, 1.9]
  let activeLevel = data.activities;
  calo = Math.ceil(data.bmr * array[activeLevel]);
  return calo ? Math.ceil(data.bmr * array[activeLevel]) : '';

}


module.exports = { updateProfile}