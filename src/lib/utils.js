const bcrypt = require('bcrypt');
const crypto = require('crypto'); 
const mongoose = require('mongoose');
const ResultsCode = require('./results-code.js');
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

$.asObjectId = function(values){
  if(Array.isArray(values)){
    values  = values.map(item => {
      item = mongoose.Types.ObjectId(item);
      return item;
    })
    return values;
  }else{
     return [mongoose.Types.ObjectId(values)];
  }
}

$.isObjectId = function(value){
  if(!mongoose.Types.ObjectId.isValid(value)){
     return false;
  }
  return mongoose.Types.ObjectId(value);
}




