const register = function(req, res) {
  res.render('register', { title: 'Register' });
};
const login = function(req, res) {
  res.render('login', { title: 'Login', message: '' });
};
module.exports = { register, login };
