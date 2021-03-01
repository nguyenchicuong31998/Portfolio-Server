const db = require('../db');
const ResultsCode = require('../lib/results-code.js');
const utils = require('../lib/utils.js');
const Enums = require('../db/enum.js');


const categoriesManager = function(app){
    this.app = app;
};
module.exports = categoriesManager;


categoriesManager.prototype.get = async function(language_code){
  console.debug(`categoriesManager.get(), language_code: ${language_code}`);
  return await db.categories.find({ language_code: language_code, status: Enums.CategoryStatuses.ACTIVE }).sort({ view_priority: 1});
}

categoriesManager.prototype.find = async function(filter){
  console.debug(`categoriesManager.find(), filter: ${JSON.stringify(filter)}`);

  const hightFilter = {};
  const lowFilter = {};

  filter.language_code && (hightFilter.language_code = filter.language_code);
  filter.id && (hightFilter._id = utils.asObjectId(filter.id));
  filter.statuses && (lowFilter.status = { $in: [].concat(filter.statuses) } )

  let searchStreams = db.categories.aggregate([
    {
        $match: hightFilter
    },
    {
        $match: lowFilter 
    }
  ])

  searchStreams.sort({
    view_priority: 1
  })

  return searchStreams.exec();
}


categoriesManager.prototype.getCategoryById = async function(categoryId){
  console.debug(`categoriesManager.getCategoryById(), categoryId: ${categoryId}`);
  return await db.categories.findOne({ _id: categoryId });
}

categoriesManager.prototype.getCategoryByName = async function (categoryName){
  console.debug(`categoriesManager.getCategoryByName(), categoryName: ${categoryName}`);
  
  return await db.categories.find({ category_name: categoryName });
}

categoriesManager.prototype.createCategory = async function(category){
  console.debug(`categoriesManager.createCategory(), category:${JSON.stringify(category)}`); 
  
  const categoryExisted = await this.getCategoryByName(category.category_name);
  
  if(categoryExisted && categoryExisted.length > 0){
     return new ResultsCode("Category_Invalid", "Category does not exist");
  }

  return await new db.categories(category).save();
}

categoriesManager.prototype.updateCategory = async function(categoryId, body){
  console.debug(`categoriesManager.updateCategory(), categoryId: ${categoryId}, body: ${JSON.stringify(body)}`);

  const category = await this.getCategoryById({_id: categoryId});

  if(!category){
    return new ResultsCode("Category_Invalid","Category does not exist");
  }
  
  delete body._id;

  return db.categories.findOneAndUpdate({_id: categoryId}, body, {  new: true });;
}