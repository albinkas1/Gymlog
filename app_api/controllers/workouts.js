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

/* POST /api/workouts - date is YYYY-MM-DD and time is HH:MM */
const workoutsCreate = function (req, res) {
  const date = req.body.time
    ? req.body.date + 'T' + req.body.time
    : req.body.date;

  Workout.create({
    exercise: req.body.exercise,
    date: date,
    sets: req.body.sets,
    reps: req.body.reps,
    weight: req.body.weight,
    note: req.body.note
  })
  .then(workout => {
    res
      .status(201)
      .json(workout);
  })
  .catch(err => {
    res
      .status(400)
      .json({ message: "Error creating workout", error: err });
  });
};

module.exports = { workoutsList, workoutsCreate };
