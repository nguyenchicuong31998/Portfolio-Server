const bcrypt = require('bcrypt');
const crypto = require('crypto'); 
const mongoose = require('mongoose');
const $ = {};
module.exports = $
var app;

$.load = async function (app) {
   app = app;
   return app;
}

$.encodePasswordSha256 = async function (encodePassword){
  return await crypto
               .createHash('sha256')
               .update(encodePassword)
               .digest('hex');
}

$.hashPassword = async function (hashPassword){  
  const salt = await bcrypt.genSalt(Number(app.ini.auth.saltRounds));
  return await bcrypt.hash(hashPassword, salt);
}

$.comparePassword = async function(password, passwordDB){
  return await bcrypt.compare(password, passwordDB);
}


$.checkLanguage = async function(supportLanguage, value){
  if(supportLanguage.includes(value)){
    return true;
  }
  return false;
}

$.asObjectId = function(value){
  return mongoose.Types.ObjectId(value);
}




