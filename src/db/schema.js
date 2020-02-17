const mongoose = require('mongoose');
const Enum = require('./enum.js');


const { String, Number, ObjectId, Date, Mixed } = mongoose.Schema.Types;

const schema = {};

schema.users = new mongoose.Schema(
  {
      display_name:{
         type: String,
         trim: true,
         minlength: 8,
         maxlength: 150      
      },    
      email:{
         type: String,
         require: true
      },
      password:{
        type: String,
        require: true
      },
      role:{
        type: String,
        default: Enum.Permission.isMember
      }
  },
  {
    collection: 'users'
  }
)

schema.categories = new mongoose.Schema(
  {
     category_name:{
        type: String,
        require: true,
     },
     category_dscpn:{
        type: String
     }
  },
  {
     collection: 'categories'
  }
) 

module.exports = schema;