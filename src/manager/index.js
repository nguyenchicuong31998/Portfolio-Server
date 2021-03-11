
const $ = {};

module.exports = $;

function buildManagers(app){
    return {
       usersManager: new (require('./users-manager'))(app),
       categoriesManager: new (require('./categories-manager'))(app),
       experienceManager: new (require('./experience-manager'))(app)
    };
}

$.load = async (app) => {
   const managers = buildManagers(app);
   app.managers = managers;
   return app;
}
