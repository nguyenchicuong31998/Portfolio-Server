const webServer = require('./web/server.js');
const configs = require('../configs/index.js');
const db = require('./db');
const app = {};
const $ = {};

$.load = async (iniFile) => {
     configs.readFile(iniFile)
     .then(configs => {
        app.ini = configs;  
        return app;
     })
    //  .then(db.load)
     .then(webServer.load)
     .then(app=>{
       
     })
     .catch((e) => {
         console.error(e);
         process.exit();
     })
    //  .then(webServer.load);
}


module.exports = $;