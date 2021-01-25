const fs = require("fs-extra");
const inquirer = require('inquirer');
const kleur = require('kleur');
const boxen = require('boxen');
const ora = require('ora');
const helper = require('../helper');

function main(){

    let logFileInit = helper.logFileTemplate();

    inquirer.prompt([
        {
            type: 'input',
            name: 'project',
            message: 'Project Name',
            default: helper.currentFolder(),
        },
        {
            type: 'input',
            name: 'author',
            message: 'Author Name',
            default: 'default',
        }
    ]).then(answers => {

        let createDate = helper.currentDate();
        let readableCreateDate = helper.dateToReadable(createDate);

        // Save inputs to log file
        logFileInit.project = answers.project;
        logFileInit.author = answers.author;
        logFileInit.created_at = createDate;

        if (fs.existsSync(helper.archiveDir())){

            // If archive already exists
            console.log(kleur.red(`Project is already initalized in directory`));
            console.log(kleur.yellow(`Run ${kleur.green('fvc remove')} to remove current FVC archive`));

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
    });
}

module.exports = {
    main
};