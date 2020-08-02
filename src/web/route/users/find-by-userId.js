

module.exports = async (req, res, next) => {
    const app = req.app.get("app")();
    const { usersManager } = app.managers;


    const { userId } = req.params;
    console.debug(`vao userId ${userId}`);
    const user = await usersManager.getUserById(userId);

    return res.json(user);
}