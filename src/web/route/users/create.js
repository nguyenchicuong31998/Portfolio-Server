

module.exports = async (req, res, next) => {
   const app = req.app.get('app')();
   const { usersManager } = app.managers;

   const newUser = req.query.body;

   const results = await usersManager.createUser(newUser);
   
   return res.send(results);
}