// const mongoose = require('mongoose');

// const mongoUri = 'mongodb://database/sizes';

// const db = mongoose.connect(mongoUri, {
//   useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
// });

// module.exports = db;
const { Pool } = require('pg');

const db = new Pool({
  database: 'clothing'
});

db.on('error', (err, client) => {
  console.error('Error:', err);
});

db.connect(err => {
  if (err) {
    console.log('could not connect database: ', err);
  } else {
    console.log('connected to database');
  }
});

module.exports = db;


