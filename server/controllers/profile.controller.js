const User = require('../models/user');
 
async function findByUserName(user) {
  return await User.findOne({email : user});
}

async function updateProfile(user) {
    return await User.updateOne({ _id: user._id }, user);
} 
 
module.exports = {findByUserName, updateProfile}