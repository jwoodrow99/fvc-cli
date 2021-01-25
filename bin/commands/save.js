const fs = require("fs-extra");
const path = require('path');
const inquirer = require('inquirer');
const kleur = require('kleur');
const boxen = require('boxen');
const ora = require('ora');
const helper = require('../helper');

function main(message){
    let logFile = helper.readLog();
    let createDate = helper.currentDate();
    let readableCreateDate = helper.dateToReadable(createDate);

    // remove prefix of files cleard for archiving
    let removingFilesRaw = helper.getAllNonIgnoredFiles();
    let removingFiles = [];
    removingFilesRaw.forEach((i, index, arr) => {
       removingFiles.push(i.replace(path.normalize(`${helper.currentDir()}/`), ''));
    });
    
    // Copy files to archive
    removingFiles.forEach(i => {
        fs.copySync(path.normalize(`${helper.currentDir()}/${i}`, `${helper.archiveDir()}/${createDate}/${i}`));
    });

    // Add log file entry
    logFile.logs[createDate] = {
        created_at: createDate,
        message: message
    }

    helper.writeLog(logFile);

    console.log(kleur.bold().green(`Current working state archived`));
    console.log(kleur.green(`Archive ID: ${kleur.yellow(createDate)}`));
    console.log(kleur.green(`Careated At: ${kleur.yellow(readableCreateDate)}`));
    console.log(kleur.green(`Message: ${kleur.yellow(message)}\n`));
}

module.exports = {
    main,
};