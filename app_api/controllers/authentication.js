const mongoose = require('mongoose');
const User = mongoose.model('User');

/* POST /api/register - username, email, password, confirmPassword */
const register = function (req, res) {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email and password are all required" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }
  if (confirmPassword !== undefined && confirmPassword !== password) {
    return res
      .status(400)
      .json({ message: "Passwords do not match" });
  }

  const user = new User({ username, email, password });

  user.save()
    .then(user => {
      res
        .status(201)
        .json(user);
    })
    .catch(err => {
      if (err.code === 11000) {
        return res
          .status(409)
          .json({ message: "That username or email is already registered" });
      }
      res
        .status(400)
        .json({ message: "Error registering user", error: err });
    });
};

/* POST /api/login - username, password */
const login = function (req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  User
    .findOne({ username: username })
    .then(user => {
      if (!user || user.password !== password) {
        return res
          .status(401)
          .json({ message: "Incorrect username or password" });
      }
      res
        .status(200)
        .json({ message: "Login successful", user: user });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error logging in", error: err });
    });
};

module.exports = {
  register,
  login
};
