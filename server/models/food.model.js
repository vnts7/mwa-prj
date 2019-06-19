/*
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    },
    sugar: {
        type: Number,
        required: true
    }
});

const Food = module.exports = mongoose.model('Food', FoodSchema);

module.exports.getFoodByName = (foodName, callback) => {
    const query = { name: foodName };
    Food.findOne(query, callback);
};

module.exports.createFood = (food, callback) => {
    food.save(callback);
};
*/