const fs = require("fs-extra");
const path = require('path');
const kleur = require('kleur');
const helper = require('../helper');

function archive(){
    fs.rmdirSync(helper.archiveDir(), {recursive: true});
    console.log(kleur.green(`FVC archive was removed`));
}

function record(archive_id){
    let logFile = helper.readLog();
    let record = logFile.logs[archive_id]

    delete logFile.logs[archive_id];
    helper.writeLog(logFile);

    fs.rmdirSync(path.join(helper.archiveDir(), archive_id), {recursive: true});

    console.log(kleur.bold().green(`FVC archive record was removed`));
    console.log(kleur.green(`Archive ID: ${kleur.yellow(record.created_at)}`));
    console.log(kleur.green(`Careated At: ${kleur.yellow(helper.dateToReadable(Number(record.created_at)))}`));
    console.log(kleur.green(`Message: ${kleur.yellow(record.message)}\n`));
}

module.exports = {
    archive,
    record,
};