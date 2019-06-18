const express = require('express');
const ct = require('../controllers/tracker');

const router = express.Router();
router.get('/:date', async (req, res, next) => {
  const data = await ct.findByDate(req.user._id, req.params.date);
  res.json({ success: true, data });
});

router.post('/:date', async (req, res, next) => {
  const data = await ct.addMeal(req.user._id, req.params.date, req.body);
  res.json({ success: true, data });
});

router.delete('/:date/:mealId', async (req, res, next) => {
  const data = await ct.removeMeal(req.user._id, req.params.date, req.params.mealId);
  res.json({ success: true, data });
});

module.exports = router;