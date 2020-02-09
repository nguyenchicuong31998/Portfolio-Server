const bcrypt = require('bcrypt');
const crypto = require('crypto'); 
const $ = {};
module.exports = $
let auth;

$.load = async (app) => {
   auth = app;
   return app;
}

$.encodePasswordSha256 = async function (encodePassword){
  return await crypto
               .createHash('sha256')
               .update(encodePassword)
               .digest('hex');
}

$.hashPassword = async function (hashPassword){  
  const salt = await bcrypt.genSalt(Number(auth.ini.auth.saltRounds));
  return await bcrypt.hash(hashPassword, salt);
}

$.comparePassword = async function(password, passwordDB){
  return await bcrypt.compare(password, passwordDB);
}




