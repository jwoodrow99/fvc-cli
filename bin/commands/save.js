const fs = require("fs-extra");
const inquirer = require('inquirer');
const kleur = require('kleur');
const boxen = require('boxen');
const ora = require('ora');
const helper = require('../helper');

function main(message){
    let logFile = helper.readLog();
    let createDate = helper.currentDate();
    let readableCreateDate = helper.dateToReadable(createDate);

    let contents = fs.readdirSync(helper.currentDir());
    contents.forEach(i => {
        if(i != '.fvc'){
            fs.copySync(`${helper.currentDir()}/${i}`, `${helper.archiveDir()}/${createDate}/${i}`);
        }
    });

    logFile.logs[createDate] = {
        created_at: createDate,
        message: message
    }

    helper.writeLog(logFile);

    console.log(kleur.bold().green(`Current working state archived`));
    console.log(kleur.green(`Archive ID: ${kleur.yellow(createDate)}`));
    console.log(kleur.green(`Careated At: ${kleur.yellow(helper.dateToReadable(createDate))}`));
    console.log(kleur.green(`Message: ${kleur.yellow(message)}\n`));
}

module.exports = {
    main,
};