var mongoose = require('mongoose');
mongoURI = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/shortlydb';
mongoose.connect(mongoURI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Mongo is now open!');
});

  // link.increments('id').primary();
  // link.string('url', 255);
  // link.string('base_url', 255);
  // link.string('code', 100);
  // link.string('title', 255);
  // link.integer('visits');

  // user: 'your_database_user',
  // password: 'password',

  // user.increments('id').primary();
  // user.string('username', 100).unique();
  // user.string('password', 100);

module.exports = db;
