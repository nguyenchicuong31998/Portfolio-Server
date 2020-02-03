const http = require("http");
const express = require("express");
let app = express();

const $ = {};

  
app.use("/", (req, res, next) => {
  res.send(`ok ${HOST}`);
});

$.load = async appInstance => {
  app = appInstance;

  console.log("vaoo", appInstance.ini);

  const HOST = appInstance.ini.server.host;
  const PORT = process.env.PORT || appInstance.ini.server.port;

  app.web = appInstance;

  return new Promise(function(resolve, reject) {

    let server = http.createServer(app);
    server.listen(PORT, HOST, function(err) {

      if(err){
         return reject(err);
      }

      console.log(`Server running... http://${HOST}:${PORT}`);
      resolve(app);
      
    });
  
  });

};

module.exports = $;
