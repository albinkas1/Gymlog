const express = require('express');
const router = express.Router();
const ctrlWorkouts = require('../controllers/workouts');
const ctrlAuth = require('../controllers/authentication');

// users
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// workouts
router
  .route('/workouts')
  .get(ctrlWorkouts.workoutsList)
  .post(ctrlWorkouts.workoutsCreate);

router
  .route('/workouts/:workoutid')
  .get(ctrlWorkouts.workoutsReadOne);

module.exports = router;
