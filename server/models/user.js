const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  roles: [{
    type: String,
  }],
  gender: { // 0: male, 1: female
    type: Boolean
  },
  weight: {
    type: Number
  },
  height: {
    type: Number
  },
  dateOfBirth: {
    type: Number //user moment.unix()
  },
  activities: { // 1: sedentary, 2: lightly active, 3: moderately active, 4: active, 5: very active
    type: Number
  },
  goal: { // 0: lose weight, 1: maintain weight, 2: gain weight
    type: Number
  },
  bmi: {
    type: Number
  },
  bmr: {
    type: Number
  },
  calorieNeeds: {
    type: Number
  },
}, {
    versionKey: false
  });


module.exports = mongoose.model('User', UserSchema);