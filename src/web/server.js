const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const routers = require("./route/index.js");
const path = require('path');
let app = express();
let managers = {};

const $ = {};

// app.use("/", (req, res, next) => {
//   res.send(`ok nek baby`);
// });


// app.use(async function(req, res, next) {

//   req.managers =  managers

//   const users = await req.managers.usersManager.getUsers();

//   console.log("vaoo user", users);
//   next();
// });
app.use('/public',express.static(path.join(__dirname + '../../../assets')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routers);
app.set('app', function (){
   return managers;
});


$.load = async appInstance => {

  managers = appInstance;

  const HOST = process.env.HOST || appInstance.ini.server.host;
  const PORT = process.env.PORT || appInstance.ini.server.port;

  app.web = appInstance;

  return new Promise(function(resolve, reject) {
    
    let server = http.createServer(app);
    server.listen(PORT, (err) => {

      if(err){
         return reject(err);
      }

      console.log(`Server running... http://${HOST}:${PORT}`);
      resolve(app);

    });
  });
};

module.exports = $;
