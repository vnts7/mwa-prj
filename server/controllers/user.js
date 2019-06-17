const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function insert(user) {
  user.password = bcrypt.hashSync(user.password, 10);
  return await new User(user).save();
}


function generateToken(user) {
  const payload = JSON.stringify(user);
  return jwt.sign(payload, config.jwtSecret);
}

module.exports = {
  insert,
  generateToken
}