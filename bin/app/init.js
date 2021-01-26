const fs = require("fs-extra");
const kleur = require('kleur');
const helper = require('../helper');

module.exports = (project, author) => {

    let logFileInit = helper.logFileTemplate();
    let createDate = helper.currentDate();
    let readableCreateDate = helper.dateToReadable(createDate);

    // Save inputs to log file
    logFileInit.project = project;
    logFileInit.author = author;
    logFileInit.created_at = createDate;

    if (fs.existsSync(helper.archiveDir())){

        // If archive already exists
        console.log(kleur.red(`Project is already initalized in directory`));
        console.log(kleur.yellow(`Run ${kleur.green('fvc destroy')} to remove current FVC archive`));

    } else {

        // Create archive folders
        fs.mkdirSync(helper.archiveDir());
        // fs.writeFile(`${helper.currentDir()}/.fvcignore`)
        helper.writeLog(logFileInit);

        // Output
        console.log(kleur.bold().green(`FVC Project Archive Initalized`));
        console.log(kleur.green(`Project: ${kleur.yellow(logFileInit.project)}`));
        console.log(kleur.green(`Author: ${kleur.yellow(logFileInit.author)}`));
        console.log(kleur.green(`Date Created: ${kleur.yellow(readableCreateDate)}`));
    }
}