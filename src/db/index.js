const mongoose = require('mongoose');

const {
   Users
} = require("./schema.js");

const db = {};

db.load = async function (app){

    const url = app.ini.mongodb.url;
    const name = app.ini.mongodb.name;
    return mongoose.connect(url,
      {
        useNewUrlParser: true,  
        name,
        autoIndex: app.ini.mongodb.autoIndex
      }
    ).then(async () =>{
       app.db = db;
       return app;
    })
}

module.exports = db;