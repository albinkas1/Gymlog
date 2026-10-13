const mongoose = require('mongoose');
const Workout = mongoose.model('Workout');

/* GET /api/workouts - newest workout first */
const workoutsList = function (req, res) {
  Workout
    .find()
    .sort({ date: -1 })
    .then(workouts => {
      res
        .status(200)
        .json(workouts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error retrieving workouts", error: err });
    });
};

module.exports = { workoutsList };
