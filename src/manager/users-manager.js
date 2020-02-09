const utils = require('../lib/utils.js');
const db  = require('../db');  


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
    console.debug(`usersManager.create(), newUser:${newUser}`);

    const user = await this.getUserByEmail(newUser.email);

    if(user) {
        return "Email already existed";
    }


    return await new db.users(newUser).save();
}