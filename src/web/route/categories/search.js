const utils = require('../../../lib/utils.js');


module.exports = async (req, res, next) => {
    const app =  req.app.get('app')();
    const { categoriesManager } = app.managers;

    let query = req.query;

    if(query.language_code){
        query.language_code =  await utils.checkLanguage(JSON.parse(app.ini.support.language), query.language_code) == true ? 
                               query.language_code : 'en';
    }

    const results = await categoriesManager.find(query);

    return res.send(results);

}