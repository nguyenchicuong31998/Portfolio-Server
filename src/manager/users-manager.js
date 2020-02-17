const utils = require('../lib/utils.js');
const db  = require('../db');  
const ResultsCode = require('../lib/results-code.js');
const Enums = require('../db/enum.js');

const usersManager = function(app){
   this.app = app;
};
module.exports = usersManager;

usersManager.prototype.getUserById = async function(userId){
    return await db.users.findById({ _id:userId });
}

usersManager.prototype.getUserByEmail = async function(email){
    return await db.users.find({ email: email });
}

usersManager.prototype.getUsers = async function (){
    const users = await db.users.find();
    return users;
}

usersManager.prototype.createUser = async function (newUser) {
    console.debug(`usersManager.create(), newUser:${JSON.stringify(newUser)}`);

    const user = await this.getUserByEmail(newUser.email);

    if(user && user.length > 0) {
        return new ResultsCode("Email_Invalid","Email already existed");
    }

    const encodePasswordSha256 = await utils.encodePasswordSha256(newUser.password);

    newUser.password = await utils.hashPassword(encodePasswordSha256);

    newUser.role =  Enums.Permission.isMember;

    return await new db.users(newUser).save();
}


usersManager.prototype.updateUser = async function(userId, newUser) {
    console.debug(`usersManager.updateUser(), userId:${userId}, users:${JSON.stringify(newUser)}`);

    const user = await this.getUserById(userId);

    if(!user){
        return new ResultsCode("User_Invalid","User does not exist");
    }

    delete newUser.password;
    delete newUser.email;

    return await db.users.findOneAndUpdate({_id: userId}, newUser, { upsert: true });
}