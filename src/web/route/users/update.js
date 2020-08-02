

module.exports = async (req, res, next) => {
   const app = req.app.get("app")();
   console.log("Vao");
   const { usersManager } = app.managers;
   const { userId }  = req.params;
   const body  = req.body;

   const updateUser = await usersManager.updateUser(userId, body);

   return res.json(updateUser);
}