const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/config')

async function insert(user) {
  user.password = bcrypt.hashSync(user.password, 10);
  return await new User(user).save();
}

async function findByEmail(email) {
  return await User.findOne({ email }, { fullname: 1, email: 1, roles: 1, password: 1 });
}


function generateToken(user) {
  const payload = JSON.stringify(user);
  return jwt.sign(payload, config.jwtSecret);
}

module.exports = {
  insert,
  generateToken,
  findByEmail,
}