
module.exports = async (req, res, next) => {
  const app = req.app.get('app')();
  const { categoriesManager } = app.managers;

  const { categoryId }  = req.params;
  const body = req.body;

  const updatedCategory = await categoriesManager.updateCategory(categoryId, body);
 
  return res.send(updatedCategory);
}
