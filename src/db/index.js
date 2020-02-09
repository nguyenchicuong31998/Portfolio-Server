const mongoose = require('mongoose');

const {
  users
} = require("./schema.js");

const db = {};

db.users = mongoose.model("users", users);

db.load = async (app) => {

    const url = app.ini.mongodb.url;
    const dbName = app.ini.mongodb.name;
    return mongoose.connect(url,
      {
        useNewUrlParser: true,  
        dbName,
        useUnifiedTopology: true,
        autoIndex: app.ini.mongodb.autoIndex == true
      }
    ).then(async () =>{
       app.db = db;
       console.log("connect successfully");
       return app;
    }).catch(async () =>{
       console.log("connect error");
    })
}

module.exports = db;