const User = require('../models/user');
 
async function findByUserName(user) {  
  console.log('user: ' , user);
  await User.findOne({email : user}).then( result => {
    if (result) {
      console.log('result: ', result)
      return result; 
    } else {
      return { message: "not found!" };
    }
  });
}

async function updateProfile(user) {
    return await User.updateOne({ _id: user._id }, user);
} 
 
module.exports = {findByUserName, updateProfile}