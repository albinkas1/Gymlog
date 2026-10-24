// API is served by this same app
const apiOptions = {
  server: 'http://localhost:' + (process.env.PORT || 3000)
};

const register = function(req, res) {
  res.render('register', { title: 'Register' });
};

/* POST /register - sends the form to the API */
const doRegister = function(req, res) {
  fetch(apiOptions.server + '/api/register', {
    method: 'POST',
    body: new URLSearchParams(req.body)
  })
    .then(response => response.json().then(body => ({ status: response.status, body })))
    .then(({ status, body }) => {
      if (status === 201) {
        return res.redirect('/login?registered=1');
      }
      res.render('register', {
        title: 'Register',
        message: body.message,
        username: req.body.username,
        email: req.body.email
      });
    })
    .catch(err => {
      res.render('register', {
        title: 'Register',
        message: 'Registration is not available right now. Please try again later.'
      });
    });
};

const login = function(req, res) {
  let message = '';
  if (req.query.registered) {
    message = 'Account created. You can now log in.';
  }
  res.render('login', { title: 'Login', message: message });
};

/* POST /login - sends the form to the API */
const doLogin = function(req, res) {
  fetch(apiOptions.server + '/api/login', {
    method: 'POST',
    body: new URLSearchParams(req.body)
  })
    .then(response => response.json().then(body => ({ status: response.status, body })))
    .then(({ status, body }) => {
      if (status === 200) {
        return res.redirect('/workouts');
      }
      res.render('login', {
        title: 'Login',
        message: body.message,
        username: req.body.username
      });
    })
    .catch(err => {
      res.render('login', {
        title: 'Login',
        message: 'Login is not available right now. Please try again later.'
      });
    });
};

module.exports = {
  register,
  doRegister,
  login,
  doLogin
};
