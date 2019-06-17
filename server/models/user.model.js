const mongoose = require('mongoose');
const FoodSchema = require('mongoose').model('Food').schema;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
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
    hashedPassword: {
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
        type: Date
    },
    activities: { // 1: sedentary, 2: lightly active, 3: moderately active, 4: active, 5: very active
        type: Number
    },
    goal: { // 1: lose weight, 2: maintain weight, 3: gain weight
        type: Number
    },
    bmi: {
        type: Number
    },
    calorieNeeds: {
        type: Number
    },
    trackers: [{
        meals: [{ // mealIndex > 0: breakfast, 1: lunch, 2: dinner, 3: snacks
            foods: [{
                food: FoodSchema,
                quantity: {
                    type: Number
                }
            }]
        }],
        date: {
            type: Date,
            unique: true
        },
        weight: {
            type: Number
        },
        calorieNeeds: {
            type: Number
        }
    }]
}, 
{
    versionKey: false
});

// module.exports = mongoose.model('User', UserSchema);
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByUsername = (username, callback) => {
    const query = { username: username };
    User.findOne(query, callback)
        .populate({ path: 'meals.foods._id', model: 'Food' });
};

module.exports.addTracker = (newTracker, callback) => {
    User.trackers.push(newTracker);
    User.save(callback);
};

module.exports.addFood = (food, quantity, mealIndex, date, callback) => {
    User.getTrackerByDate(date).meals[mealIndex].foods.push({
        food: food,
        quantity: quantity
    });
    User.getTrackerByDate(date).meals[mealIndex].totalCalories += food.calories * quantity;
    User.save(callback);
};

module.exports.getTrackerByDate = (date, callback) => {
    const query = { date: date };
    User.trackers.findOne(query, callback);
};

module.exports.getWeightByDate = (date, callback) => {
    const query = { date: date };
    User.trackers.findOne(query, callback).weight;
};