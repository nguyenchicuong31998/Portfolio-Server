const jwt = require('jsonwebtoken');
const ResultsCode = require('./results-code.js');
const SECRET_KEY = 'portfolioManager';

const $ = {};
module.exports = $;

$.generateToken = async function(data){
    return jwt.sign({
        data,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    },
    { 
      SECRET_KEY
    })
}

$.verifyToken = async function (token, SECRET_KEY) {
    if(!token){
        return new ResultsCode("Auth","Access Denied");
    }
    return jwt.verify(token, SECRET_KEY, (err, results) => {
        if(err){
            return new ResultsCode("Auth","Token Expired");
        }
        return results;
    })
}


$.generateUserAccessToken = async function (userId, password = undefined, tokenExpiredTime = 15, refreshTokenExpiredTime = 365 * 24 * 60 * 60){
   return {
       token: generateToken({ userId }, tokenExpiredTime),
       refreshToken: generateToken({ userId }, refreshTokenExpiredTime)
   }
}

