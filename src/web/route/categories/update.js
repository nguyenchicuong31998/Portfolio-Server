
module.exports = async (req, res, next) => {
  const app = req.app.get('app')();
  const { categoriesManager } = app.managers;

  const { categoryId }  = req.params;
  // const body = req.body;
  console.log(`categoryId`);
  // const updateCategory = await categoriesManager.updateCategory(categoryId, body);
 
  // return res.json(updateCategory);
}
