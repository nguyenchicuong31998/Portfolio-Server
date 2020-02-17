const mongoose = require('mongoose');

const {
  users,
  categories
} = require("./schema.js");

const db = {};

db.users = mongoose.model("users", users);
db.categories = mongoose.model("categories", categories);

db.load = async (app) => {

    const url = app.ini.mongodb.url;
    const dbName = app.ini.mongodb.name;
    return mongoose.connect(url,
      {
        useNewUrlParser: true,  
        dbName,
        poolSize: 2,
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