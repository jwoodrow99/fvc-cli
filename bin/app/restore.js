const fs = require("fs-extra");
const path = require('path');
const kleur = require('kleur');
const helper = require('../helper');

function restore(archive_id){

    let logFile = helper.readLog();

    // Copy files from archive to working dir
    let archiveContents = fs.readdirSync(path.join(helper.archiveDir(), archive_id));
    archiveContents.forEach(i => {
        fs.copySync(path.join(helper.archiveDir(), archive_id, i), path.join(helper.currentDir(), i));
    });

    console.log(kleur.bold().green(`Working directory restored to previous archive`));
    console.log(kleur.green(`Archive ID: ${kleur.yellow(archive_id)}`));
    console.log(kleur.green(`Careated At: ${kleur.yellow(helper.dateToReadable(logFile.logs[archive_id].created_at))}`));
    console.log(kleur.green(`Message: ${kleur.yellow(logFile.logs[archive_id].message)}\n`));
}

function full(archive_id){

    // Remove contents of working dir
    let workingContents = fs.readdirSync(helper.currentDir());

    workingContents.forEach(i => {
        if (i != '.fvc'){
            fs.removeSync(path.join(helper.currentDir(), i));
        }
    });

    restore(archive_id);
}

module.exports = {
    restore,
    full,
};