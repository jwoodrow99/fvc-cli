const fs = require("fs-extra");
const path = require('path');
const kleur = require('kleur');
const helper = require('../helper');

module.exports = (archive_id, confirm) => {
    if(confirm === true){
        if (archive_id === undefined){
                fs.rmdirSync(helper.archiveDir(), {recursive: true});
        } else {
                fs.rmdirSync(path.join(helper.archiveDir(), archive_id), {recursive: true});
                let logFile = helper.readLog();
                delete logFile.logs[archive_id];
                helper.writeLog(logFile);
        }
        console.log(kleur.green(`FVC archive was removed`));
    } else {
        console.log(kleur.yellow(`FVC archive was NOT removed`));
    }
}