const mongoose = require('mongoose');
const Enum = require('./enum.js');

const Schema = mongoose.Schema;

const { String, Number, ObjectId, Date, Mixed } = Schema.Types;

const schema = {};


schema.Users = new Schema(
  {
      email:{
         type: String,
         trim: true
      }
  }
)


module.exports = schema;