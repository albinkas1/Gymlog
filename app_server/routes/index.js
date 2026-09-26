const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlWorkouts = require('../controllers/workouts');
router.get('/', ctrlUsers.login);
router.get('/register', ctrlUsers.register);
router.get('/login', ctrlUsers.login);
router.get('/workouts', ctrlWorkouts.list);
module.exports = router;
