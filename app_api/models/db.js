const mongoose = require('mongoose');

// connection string comes from the MONGODB_URI env variable
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
