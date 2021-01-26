const kleur = require('kleur');
const boxen = require('boxen');
const helper = require('../helper');

module.exports = () => {
    logFile = helper.readLog();
    console.log(boxen(`${kleur.bold().green(`Project Information`)}\n${kleur.green(`Project: ${kleur.yellow(logFile.project)}`)}\n${kleur.green(`Author: ${kleur.yellow(logFile.author)}`)}\n${kleur.green(`Date Created: ${kleur.yellow(helper.dateToReadable(logFile.created_at))}`)}\n${kleur.green(`Number of archives: ${kleur.yellow(Object.keys(logFile.logs).length)}`)}`, {padding: 1}));
}