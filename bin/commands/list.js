const fs = require("fs-extra");
const path = require('path');
const inquirer = require('inquirer');
const kleur = require('kleur');
const boxen = require('boxen');
const ora = require('ora');
const helper = require('../helper');

function main(){
    let logFile = helper.readLog();

    let keys = Object.keys(logFile.logs).sort();

    console.log(boxen(`${kleur.bold().green(`Project Information`)}\n${kleur.green(`Project: ${kleur.yellow(logFile.project)}`)}\n${kleur.green(`Author: ${kleur.yellow(logFile.author)}`)}\n${kleur.green(`Date Created: ${kleur.yellow(helper.dateToReadable(logFile.created_at))}`)}`, {padding: 1}));


    console.log(kleur.bold().green(`\n\nFVC Project Archive Log List\n`));

    keys.forEach(i => {
        console.log(kleur.green(`Archive ID: ${kleur.yellow(i)}`));
        console.log(kleur.green(`Careated At: ${kleur.yellow(helper.dateToReadable(Number(logFile.logs[i].created_at)))}`));
        console.log(kleur.green(`Message: ${kleur.yellow(logFile.logs[i].message)}\n`));
    });
}

module.exports = {
    main,
};