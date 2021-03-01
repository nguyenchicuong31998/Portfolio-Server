const Utils = require('../../../lib/utils.js');


module.exports = async (req, res, next) => {
    const app = req.app.get('app')();
    const { categoriesManager } = app.managers;


    let { language_code }  = req.query;

    if(language_code){
        language_code = (await Utils.checkLanguage(app.ini.support.language, language_code)) == true ? language_code : 'en';
    }
    
    const categories = await categoriesManager.get(language_code);

    return res.send(categories);
}