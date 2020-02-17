

module.exports = async (req, res, next) => {
   const app = req.app.get('app')();
   const { usersManager } = app.managers;

   const { body } = req.body;

   const results = await usersManager.createUser(body);
   
   console.debug(`results create user: ${results}`);

   return res.send(results);
}