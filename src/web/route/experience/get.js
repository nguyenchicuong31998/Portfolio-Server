const utils = require('../../../lib/utils.js');

module.exports = async (req, res, next) => {
    const app = req.app.get('app')();
    const { experienceManager } = app.managers;

    let { language_code }  = req.query;

    if(language_code){
        language_code = (await utils.checkLanguage(app.ini.support.language, language_code)) == true ? language_code : 'en';
    }
    
    const experience = await experienceManager.get(language_code);

    return res.send(experience);
}