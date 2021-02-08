// const mongoose = require('mongoose');

// const mongoUri = 'mongodb://database/sizes';

// const db = mongoose.connect(mongoUri, {
//   useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
// });

// module.exports = db;
const { Client } = require('pg');
const config = require('./dbConfig.js');

const db = new Client({
  database: 'clothing'
});

db.connect(err => {
  if (err) {
    console.log('could not connect database: ', err);
  } else {
    console.log('connected to database');
  }
});

module.exports = db;


