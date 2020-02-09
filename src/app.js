const webServer = require('./web/server.js');
const configs = require('../configs/index.js');
const managers = require('./manager/index.js');
const utils = require('./lib/utils.js');
const db = require('./db');
let app = {};
const $ = {};

$.load = function (iniFile) {
     configs.readFile(iniFile)
     .then(configs => {
        app.ini = configs;  
        return app;
     })
     .then(db.load)
     .then(managers.load)
     .then(utils.load)
     .then(webServer.load)
   //   .catch((e) => {
   //       console.error(e);
   //       process.exit();
   //   })
    //  .then(webServer.load);
}


module.exports = $;