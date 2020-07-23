const db = require('../db');
const ResultsCode = require('../lib/results-code.js');


const categoriesManager = function(app){
    this.app = app;
};
module.exports = categoriesManager;


categoriesManager.prototype.get = async function(){
  console.debug(`categoriesManager.get()`);
  return await db.categories.find({});
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
     return new ResultsCode("Category_Invalid", "Category does not existed");
  }

  return await new db.categories(category).save();
}

categoriesManager.prototype.updateCategory = async function(categoryId,newCategory){
  console.debug(`categoriesManager.updateCategory(), categoryId: ${categoryId}, newCategory: ${JSON.stringify(newCategory)}`);

}