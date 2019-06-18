const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const TrackerSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
  },
  calorieNeeds: {
    type: Number,
    required: true,
  },
  date: {
    type: Number,
    required: true,
    index: true,
  },
  goal: { type: Number, required: true, },//0: lose weight, 1: maintain weight, 2: gain weight
  userId: {
    type: ObjectId,
    required: true,
    index: true,
  },
  meals: [
    {
      _id: ObjectId,
      name: { type: String, require: true },
      calories: { type: Number, require: true },
      quantity: { type: Number, require: true },
      type: { type: Number, require: true }, //0: breakfast, 1: lunch, 2: dinner, 3: snacks
    }
  ]

}, { versionKey: false });

TrackerSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Tracker', TrackerSchema);