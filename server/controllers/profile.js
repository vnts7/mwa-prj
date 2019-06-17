const User = require('../models/user');
 
function findByUserName(user) { 
  // result =  User.findOne({email : user})
  // console.log('result findOne: ' , result);
  // return result; 
  console.log('user: ' , user);
  User.findOne({email : user}).then( result => {
    if (result) {
      console.log('result: ', result)
      return result; 
    } else {
      return { message: "not found!" };
    }
  });
}
 
module.exports = {findByUserName}