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
    collection: 'users',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
)


schema.experience = new mongoose.Schema(
   {
      company_name:{
         type: String
      },
      company_date: {
         type: String
      },
      project: {
         title: {
            type: String
         },
         value: {
            type: String
         }
      },
      position: {
         title: {
            type: String
         },
         value: {
            type: String
         }
      },
      description: {
         title: {
            type: String
         },
         value: {
            type: String
         }
      },
      responsibilities: {
         title: {
            type: String
         },
         value: {
            type: Array
         },
      },
      accomplishments: {
         title: {
            type: String
         },
         value: {
            type: Array
         },
      },
      technologies: {
         type: String
      },
      website: {
         title: {
            type: String
         },
         value: {
            type: String
         }
      },
      date: {
         type: Date
      },
      status: {
         type: String,
         default: Enum.ExperienceStatuses.INACTIVE
      },
      language_code: {
         type: String,
         default: Enum.LanguageCode.English
      }
   },
   {
      collection: 'experience',
      timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt'}
   }
)

// schema.locations = new mongoose.Schema(
//    {
      
//    },
//    {
//       collection: 'locations'
//    }
// )

schema.categories = new mongoose.Schema(
  {
     category_name:{
        type: String,
        require: true,
     },
     category_desc:{
        type: String
     },
     href:{
         type: String
     },
     language_code:{
        type: String,
        default: Enum.LanguageCode.English
     },
     view_priority: {
         type: Number
     },
     status: {
        type: String,
        default: Enum.CategoryStatuses.ACTIVE
     }
  },
  {
     collection: 'categories',
     timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
) 


schema.configs = new mongoose.Schema(
   {
      name:{
         type: String,
         minlength: 1,
         unique: true
      },
      value:{
         type: Mixed
      }
   },
   {
      collection: 'configs',
      timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
   }
)

module.exports = schema;


