const express = require('express');
const router = express.Router();
const ctrlWorkouts = require('../controllers/workouts');
router.get('/workouts', ctrlWorkouts.workoutsList);
module.exports = router;
