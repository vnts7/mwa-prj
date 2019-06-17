const User = require('../models/user.model');
const Food = require('../models/food.model');

const controller = {};

/**
 * Add new tracker
 * 
 * @param {Date} req.body.date
 */
controller.addTracker = (req, res) => {
    User.getUserByUsername(req.session.username, (err, user) => {
        user.getTrackerByDate(req.body.date, (err, tracker) => {
            if (err) {
                return res.status(500).json({
                    message: 'An error occured while adding tracker.'
                });
            }
            if (!tracker) {
                var meal = {
                    foods = [],
                    totalCalories: 0
                },
                var meals = [],
                for (var i = 0; i < 4; i++) {
                    meals[i] = meal;
                }
                var newTracker = {
                    meals: meals,
                    date: req.body.date,
                    totalCalories: 0,
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
}

/**
 * Add food to meal
 * 
 * @param {Food} req.body.food
 * @param {number} req.body.quantity
 * @param {Date} req.body.date
 * @param {number} req.body.type - meal type 
 */
controller.addFood = (req, res) => {
    Food.getFoodByName(req.body.food.name, (err, food) => {
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
};

/**
 * Get daily tracker
 * 
 * @param {Date} req.body.date
 */
controller.getDailyTracker = (req, res) => {
    User.getUserByUsername(req.session.username, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Failed to get tracker.'
            });
        }

        let summary = [];

        let calories = 0, protein = 0, carbs = 0, fat = 0, sugar = 0;

        let tracker = user.getTrackerByDate(req.body.date, (err) => {
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
};

module.exports = controller;