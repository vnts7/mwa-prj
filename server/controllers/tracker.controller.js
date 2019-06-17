const mongo = require('mongodb');

const User = require('../models/user.model');
const Food = require('../models/food.model');

const controller = {};

/**
 * Add new tracker
 * 
 * {Date} req.body.date
 */
controller.addTracker = async((req, res) => {
    await User.getUserByUsername(req.session.username, (err, user) => {
        user.getTrackerByDate(req.body.date, (err, tracker) => {
            if (err) {
                return res.status(500).json({
                    message: 'An error occured while adding tracker.'
                });
            }
            if (!tracker) {
                for (var i = 0; i < 4; i++) {
                    var meal = {
                        _id: mongo.ObjectID,
                        foods: []
                    }
                    meals[i] = meal;
                }
                var newTracker = {
                    _id: mongo.ObjectID,
                    meals: meals,
                    date: req.body.date,
                    weight: user.weight,
                    calorieNeeds: user.calorieNeeds
                };
                user.addTracker(newTracker, (err) => {
                    if (err) {
                        return res.status(500).json({
                            message: 'An error occured while adding tracker.'
                        });
                    }
                });
            }
        });
    });
});

/**
 * Add food to meal
 * 
 * {Object} req.body.food
 * {number} req.body.quantity
 * {Date} req.body.date
 * {number} req.body.type - meal type 0: breakfast, 1: lunch, 2: dinner, 3: snacks
 */
controller.addFood = async((req, res) => {
    await Food.getFoodByName(req.body.food.name, (err, food) => {
        if (err) {
            return res.status(500).json({
                message: 'An error occured while adding food.'
            });
        }

        if (!food) {
            food = new Food({
                name: req.body.food.name,
                calories: req.body.food.calories,
                protein: req.body.food.protein,
                carbs: req.body.food.carbs,
                fat: req.body.food.fat,
                sugar: req.body.food.sugar
            });
            Food.createFood(food, (err) => {
                if (err) {
                    return res.status(500).json({
                        message: 'An error occured while adding food.'
                    });
                }
            });
        }

        User.getUserByUsername(req.session.username, (err, user) => {
            user.addFood(req.body.food, req.body.quantity, req.body.type, req.body.date, (err) => {
                if (err) {
                    return res.status(500).json({
                        message: 'An error occured while adding food.'
                    });
                } else {
                    return res.json({
                        message: 'Food added.'
                    });
                }
            })
        });
    });
});

/**
 * Remove food from meal
 * 
 * {Object} req.body.id
 * {Date} req.body.date
 * {number} req.body.type - meal type 0: breakfast, 1: lunch, 2: dinner, 3: snacks
 */
controller.removeFood = async((req, res) => {
    User.getUserByUsername(req.session.username, (err, user) => {
        user.removeFood(req.body.id, req.body.type, req.body.date, (err) => {
            if (err) {
                return res.status(500).json({
                    message: 'An error occured while adding food.'
                });
            } else {
                return res.json({
                    message: 'Food added.'
                });
            }
        })
    });
});

/**
 * Remove tracker
 * 
 * {Date} req.body.date
 */
controller.removeTracker = async((req, res) => {
    User.getUserByUsername(req.session.username, (err, user) => {
        user.removeTracker(req.body.date, (err, tracker) => {
            if (err) {
                return res.status(500).json({
                    message: 'An error occured while removing tracker.'
                });
            }
        });
    });
});

/**
 * Clear all trackers
 */
controller.clearAllTrackers = async((req, res) => {
    User.getUserByUsername(req.session.username, (err, user) => {
        user.clearAllTrackers((err, tracker) => {
            if (err) {
                return res.status(500).json({
                    message: 'An error occured while clearing all trackers.'
                });
            }
        });
    });
});

/**
 * Get daily tracker
 * 
 * {Date} req.params.date
 */
controller.getDailyTracker = async((req, res) => {
    User.getUserByUsername(req.session.username, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Failed to get tracker.'
            });
        }

        let summary = [];

        let calories = 0, protein = 0, carbs = 0, fat = 0, sugar = 0;

        let tracker = user.getTrackerByDate(req.params.date, (err) => {
            if (err) {
                return res.status(500).json({
                    message: 'Failed to get tracker.'
                });
            }
        })

        let meals = tracker.meals;
        let foods = meals.foods;

        for (var i = 0; i < meals.length; i++) {
            for (var j = 0; j < foods.length; j++) {
                let food = foods[j].food;
                let quantity = foods[j].quantity;
                calories += food.calories * quantity;
                protein += food.protein * quantity;
                carbs += food.carbs * quantity;
                fat += food.fat * quantity;
                sugar += food.sugar * quantity
            }
            
        }

        calories = Math.round(calories);
        protein = Math.round(protein);
        carbs = Math.round(carbs);
        fat = Math.round(fat);
        sugar = Math.round(sugar);
        summary.push({
            name: 'Total', calories: calories, protein: protein, carbs: carbs, fat: fat, sugar: sugar
        });

        res.json({
            summary: summary,
            meals: meals
        });
    });
});

module.exports = controller;