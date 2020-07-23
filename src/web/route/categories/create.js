

module.exports = async (req, res, next) => {
   const app = req.app.get('app')();
   const { categoriesManager } = app.managers;

   const body = req.body;

   const newCategory = await categoriesManager.createCategory(body);
  
   return res.send(newCategory);
}