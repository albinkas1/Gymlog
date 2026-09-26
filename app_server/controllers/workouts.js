const list = function(req, res) {
  res.render('workouts', { title: 'Workout log', workouts: [], message: '' });
};
module.exports = { list };
