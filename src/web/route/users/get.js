module.exports = async (req, res, next) => {
  const app = req.app.get('app')();
  const { usersManager } = app.managers;

  const users = await usersManager.getUsers();

  return res.json(users);
}


