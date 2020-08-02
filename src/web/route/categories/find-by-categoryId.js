module.exports = async (req, res, next) => {
  const app = req.app.get('app')();
  console.debug(`vao id`);
  const { categoriesManager } = app.managers;

  const { categoryId }  = req.params;
  // const body = req.body;
  console.debug(`categoryId`);
  const Category = await categoriesManager.getCategoryById(categoryId);
 
  return res.json(Category);
}