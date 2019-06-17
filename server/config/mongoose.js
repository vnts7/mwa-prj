const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongo.host, { keepAlive: 1 , useNewUrlParser: true }).then(
  () => {console.log('Connected to DB ....', config.mongo.host)}
).catch( (err) => {console.log('connection error', err)});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongo.host}`);
});

