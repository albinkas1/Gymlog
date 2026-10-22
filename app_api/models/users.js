const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/
  },
  password: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

mongoose.model('User', userSchema);
