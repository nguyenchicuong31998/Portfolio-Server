


module.exports = async (req, res, next) => {
    const app = req.app.get('app')();
    const { experienceManager } = app.managers;

    const body = req.body;

    const newExperience = await experienceManager.create(body);

    return res.send(newExperience);
}