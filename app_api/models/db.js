const mongoose = require('mongoose');

// The Atlas connection string is read from an environment variable,
// so the username and password are not written into the code.
const dbURI = process.env.MONGODB_URI;

if (!dbURI) {
  console.log('MONGODB_URI is not set, so Mongoose is not connected');
} else {
  mongoose.connect(dbURI, { dbName: 'GymLog' }).then(
    () => { console.log('Mongoose is connected'); },
    err => { console.log(err); }
  );
}

require('./workouts');
require('./users');
