const bcrypt = require('bcrypt');
const User = require('../models/user');

async function insert(user) {
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

module.exports = {
  insert
}