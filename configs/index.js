const ini = require('ini');
const fs = require('fs');

const $ = {};
module.exports = $

$.readFile = async (path) => {
   const text = fs.readFileSync(path, 'utf-8');
   return ini.parse(text);
}