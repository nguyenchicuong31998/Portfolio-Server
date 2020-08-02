
module.exports = async (req, res, next) => {
    const app = req.app.get('app')();
    const { categoriesManager } = app.managers;

    const categories = await categoriesManager.get();
    return res.send(categories);
}