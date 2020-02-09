const mongoose = require('mongoose');
const Enum = require('./enum.js');


const { String, Number, ObjectId, Date, Mixed } = mongoose.Schema.Types;

const schema = {};

schema.users = new mongoose.Schema(
  {
      email:{
         type: String,
         default: "nguyenchicuong@gmail.com"
      },
      password:{
        type: String,
        default: "123456"
      }
  },
  {
    collection: 'users'
  }
)
module.exports = schema;