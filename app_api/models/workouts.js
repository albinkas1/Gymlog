const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  exercise: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  sets: {
    type: Number,
    required: true,
    min: 1
  },
  reps: {
    type: Number,
    required: true,
    min: 1
  },
  weight: {
    type: Number,
    'default': 0,
    min: 0
  },
  note: String
});

mongoose.model('Workout', workoutSchema);
