const fs = require("fs-extra");
const inquirer = require('inquirer');
const kleur = require('kleur');


function main(message){

    let currentDir = process.cwd();
    let folderPathArr = currentDir.split('/');
    let folderName = folderPathArr[folderPathArr.length - 1]

    let logFileRaw = fs.readFileSync(currentDir + '/.fvc/log.json');
    let log_file = JSON.parse(logFileRaw);

    let created_at = Date.now();

    let contents = fs.readdirSync(currentDir);
    contents.forEach(i => {
        if(i != '.fvc'){
            fs.copySync(`${currentDir}/${i}`, `${currentDir}/.fvc/${created_at}/${i}`);
        }
    });

    log_file.logs[created_at] = {
        created_at: created_at,
        message: message
    }

    fs.writeFileSync(`${currentDir}/.fvc/log.json`, JSON.stringify(log_file));
}

module.exports = {
    main,
};