const fs = require("fs-extra");
const path = require('path');
const inquirer = require('inquirer');
const kleur = require('kleur');
const boxen = require('boxen');
const ora = require('ora');
const helper = require('../helper');

function main(archive_id, args){

    if(args.full){
        console.log(kleur.red(`By FULL restoring an old archive, all working files will be removed.`));
    } else {
        console.log(kleur.red(`By restoring an old archive, all restored files will be overwritten.`));
    }
    
    console.log(kleur.red(`It is reccomended to make an archive before resoring a previous archive!`));

    inquirer.prompt([
        {
            type: 'confirm',
            name: 'restore',
            message: 'Do you wish to restore this archive?'
        }
    ]).then(answers => {

        let logFile = helper.readLog();

        if(answers.restore === true){

            if(args.full){
                // Remove contents of working dir
                let workingContents = fs.readdirSync(helper.currentDir());
                workingContents.forEach(i => {
                    if (i != '.fvc'){
                        fs.removeSync(path.normalize(`${helper.currentDir()}/${i}`));
                    }
                });
            }

            // Copy files from archive to working dir
            let archiveContents = fs.readdirSync(path.normalize(`${helper.archiveDir()}/${archive_id}`));
            archiveContents.forEach(i => {
                fs.copySync(path.normalize(`${helper.archiveDir()}/${archive_id}/${i}`, `${helper.currentDir()}/${i}`));
            });

            console.log(kleur.bold().green(`Working directory restored to previous archive`));
            console.log(kleur.green(`Archive ID: ${kleur.yellow(archive_id)}`));
            console.log(kleur.green(`Careated At: ${kleur.yellow(helper.dateToReadable(logFile.logs[archive_id].created_at))}`));
            console.log(kleur.green(`Message: ${kleur.yellow(logFile.logs[archive_id].message)}\n`));

        } else {
            console.log(kleur.red(`FVC archive was not restored`));
        }
    });
}

module.exports = {
    main,
};