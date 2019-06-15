const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongo.host, { keepAlive: 1 });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongo.host}`);
});