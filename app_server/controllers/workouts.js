// API is served by this same app
const apiOptions = {
  server: 'http://localhost:' + (process.env.PORT || 3000)
};

// format a workout for the view
const formatWorkout = function (workout) {
  const date = new Date(workout.date);
  return {
    exercise: workout.exercise,
    date: date.toLocaleDateString('en-IE', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
      timeZone: 'Europe/Dublin'
    }),
    time: date.toLocaleTimeString('en-IE', {
      hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Dublin'
    }),
    sets: workout.sets,
    reps: workout.reps,
    weight: workout.weight,
    note: workout.note
  };
};

/* GET /workouts - asks the API for the workouts, then renders them */
const list = function (req, res) {
  let message = '';
  if (req.query.err === 'val') {
    message = 'That workout could not be saved. Exercise, date, sets and reps are required.';
  }

  fetch(apiOptions.server + '/api/workouts')
    .then(response => response.json())
    .then(workouts => {
      res.render('workouts', {
        title: 'Workout log',
        workouts: workouts.map(formatWorkout),
        message: message
      });
    })
    .catch(err => {
      res.render('workouts', {
        title: 'Workout log',
        workouts: [],
        message: 'Workouts could not be loaded. Please try again later.'
      });
    });
};

/* POST /workouts - sends the form to the API, then shows the log again */
const addWorkout = function (req, res) {
  // skip empty fields so schema defaults apply
  const formData = new URLSearchParams();
  for (const [name, value] of Object.entries(req.body)) {
    if (value !== '') {
      formData.append(name, value);
    }
  }

  fetch(apiOptions.server + '/api/workouts', { method: 'POST', body: formData })
    .then(response => {
      if (response.status === 201) {
        res.redirect('/workouts');
      } else {
        res.redirect('/workouts?err=val');
      }
    })
    .catch(err => {
      res.redirect('/workouts?err=val');
    });
};

module.exports = {
  list,
  addWorkout
};
