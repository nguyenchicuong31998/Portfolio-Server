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
  filter.ids && (hightFilter._id = { $in: utils.asObjectId(filter.ids)});
  filter.statuses && (lowFilter.status = { $in: [].concat(filter.statuses) });

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

  const isSupportLanguage = await utils.checkLanguage(JSON.parse(this.app.ini.support.language), category.language_code);

  if(!isSupportLanguage){
      return new ResultsCode("Category_Invalid", "Category does not support this language");
  } 
  
  const newCategory = {
    language_code: category.language_code || "en",
    category_name: category.category_name,
    category_desc: category.category_desc,
    view_priority: category.view_priority,
    href: category.href,
    status: Enums.CategoryStatuses.INACTIVE
  }

  return await new db.categories(newCategory).save();
}

categoriesManager.prototype.updateCategory = async function(categoryId, body){
  console.debug(`categoriesManager.updateCategory(), categoryId: ${categoryId}, body: ${JSON.stringify(body)}`);

  const isObjectId = utils.isObjectId(categoryId);

  if(!isObjectId){
    return new ResultsCode("Object_Invalid","ObjectId does not invalid");
  }

  const category = await this.getCategoryById({_id: categoryId});

  if(!category){
    return new ResultsCode("Category_Invalid","Category does not exist");
  }

  const isSupportLanguage = await utils.checkLanguage(JSON.parse(this.app.ini.support.language), body.language_code);

  if(!isSupportLanguage){
      return new ResultsCode("Category_Invalid", "Category does not support this language");
  } 
  
  delete body._id;

  return db.categories.findOneAndUpdate({_id: categoryId}, body, {  new: true });;
}

