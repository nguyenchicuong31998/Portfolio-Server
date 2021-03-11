

const db = require('../db');
const resultsCode = require('../lib/results-code');
const util = require('../lib/utils.js');

const experienceManager = function(app){
    this.app = app;
}

module.exports = experienceManager;


experienceManager.prototype.get = async function(language_code){
    console.debug(`experienceManager.get(), language_code: ${language_code}`);

    return db.experience.find({language_code: language_code}).sort({date: -1});
}

experienceManager.prototype.create = async function(experience){
    console.debug(`experienceManager.create(), experience: ${JSON.stringify(experience)}`);

    if(experience.language_code){
        const isSupportLanguage = await util.checkLanguage(JSON.parse(this.app.ini.support.language), experience.language_code);
        if(!isSupportLanguage){
            return new ResultsCode("Experience_Invalid", "Experience does not support this language");
        } 
    }

    const newExperience = {
        company_name: experience.company_name,
        company_date: experience.company_date,
        project:{
            title: experience.project.title,
            value: experience.project.value
        },
        position: {
            title: experience.position.title,
            value: experience.position.value
        },
        description: {
            title: experience.description.title,
            value: experience.description.value
        },
        responsibilities: {
            title: experience.responsibilities.title,
            value: experience.responsibilities.value
        },
        accomplishments: {
            title: experience.accomplishments.title,
            value: experience.accomplishments.value
        },
        technologies: experience.technologies,
        website: {
            title: experience.website.title,
            value: experience.website.value
         },
         date: new Date(),
         language_code: experience.language_code || "en"
    }

    return await new db.experience(newExperience).save();
}