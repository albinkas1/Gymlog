const express = require('express');
const router = express.Router();
const ctrlWorkouts = require('../controllers/workouts');
router.route('/workouts').get(ctrlWorkouts.workoutsList).post(ctrlWorkouts.workoutsCreate);
module.exports = router;
