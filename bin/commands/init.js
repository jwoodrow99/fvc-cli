const fs = require("fs-extra");
const inquirer = require('inquirer');
const kleur = require('kleur');

function main(){

    let currentDir = process.cwd();
    let folderPathArr = currentDir.split('/');
    let folderName = folderPathArr[folderPathArr.length - 1]

    let log_file = {
        project: null,
        author: null,
        created_at: null,
        logs: {},
    }

    inquirer.prompt([
        {
            type: 'input',
            name: 'project',
            message: 'Project Name',
            default: String(folderName),
        },
        {
            type: 'input',
            name: 'author',
            message: 'Author Name',
            default: 'default',
        }
    ]).then(answers => {

        // Save inputs to log file
        log_file.project = answers.project;
        log_file.author = answers.author;
        log_file.created_at = Date.now();

        let created_at = new Date(log_file.created_at);
        let dir = currentDir + '/.fvc';

        if (fs.existsSync(dir)){

            // Output
            console.log(kleur.red(`Project is already initalized in directory`));
            console.log(kleur.yellow(`Run ${kleur.green('fvc remove')} to remove current FVC archive`));

        } else {

            // Create archive folders
            fs.mkdirSync(dir);
            fs.writeFileSync(dir + '/log.json', JSON.stringify(log_file));

            // Output
            console.log(`Project initalized`);
            console.log(kleur.green(`Project: ${kleur.yellow(log_file.project)}`));
            console.log(kleur.green(`Author: ${kleur.yellow(log_file.author)}`));
            console.log(kleur.green(`Date Created: ${kleur.yellow(created_at.toLocaleDateString())} ${kleur.yellow(created_at.toLocaleTimeString())}`));
        }
    });
}

module.exports = {
    main,
};