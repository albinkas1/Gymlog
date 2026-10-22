const express = require('express');
const router = express.Router();

const ctrlUsers = require('../controllers/users');
const ctrlWorkouts = require('../controllers/workouts');

/* User pages */
router.get('/', ctrlUsers.login);
router.get('/register', ctrlUsers.register);
router.post('/register', ctrlUsers.doRegister);
router.get('/login', ctrlUsers.login);
router.post('/login', ctrlUsers.doLogin);

/* Workout page */
router.get('/workouts', ctrlWorkouts.list);
router.post('/workouts', ctrlWorkouts.addWorkout);

module.exports = router;
