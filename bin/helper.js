const fs = require("fs-extra");
const path = require('path');
const inquirer = require('inquirer');
const kleur = require('kleur');
const boxen = require('boxen');
const ora = require('ora');

function logFileTemplate(){
    return {
        project: null,
        author: null,
        created_at: null,
        logs: {}
    }
}

function currentDir(){
    return path.normalize(process.cwd());
}

function currentFolder(){
    let currentDir = path.normalize(process.cwd());
    let folderPathArr = currentDir.split(path.normalize('/'));
    return folderPathArr[folderPathArr.length - 1];
}

function archiveDir(){
    return path.normalize(`${process.cwd()}/.fvc`);
}

function currentDate(){
    return Date.now();
}

function dateToReadable(date){
    let newDate = new Date(date);
    return `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`;
}

function readLog(){
    let logFileRaw = fs.readFileSync(path.normalize(`${currentDir()}/.fvc/log.json`));
    return JSON.parse(logFileRaw);
}

function writeLog(logObj){
    fs.writeFileSync(path.normalize(`${currentDir()}/.fvc/log.json`), JSON.stringify(logObj));
}

function getAllFiles(dirPath = currentDir(), arrayOfFiles) {

    files = fs.readdirSync(path.normalize(dirPath));
    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
        if (fs.statSync(path.normalize(`${dirPath}/${file}`)).isDirectory()) {
            arrayOfFiles = getAllFiles(path.normalize(`${dirPath}/${file}`), arrayOfFiles);
        } else {
            arrayOfFiles.push(path.normalize(`${dirPath}/${file}`));
        }
    });

    return arrayOfFiles;
}

function getAllNonIgnoredFiles(dirPath = currentDir(), arrayOfFiles) {

    let ignoreFiles = getIgnoreFiles(path.normalize(dirPath));

    let files = fs.readdirSync(path.normalize(dirPath));
    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
        if(!ignoreFiles.includes(path.normalize(`${dirPath}/${file}`))){
            if (fs.statSync(path.normalize(`${dirPath}/${file}`)).isDirectory()) {
                arrayOfFiles = getAllFiles(path.normalize(`${dirPath}/${file}`), arrayOfFiles);
            } else {
                arrayOfFiles.push(path.normalize(`${dirPath}/${file}`));
            }
        }
    });

    return arrayOfFiles;
}

function getIgnoreFiles(path = currentDir()){
    if(fs.existsSync(path.normalize(`${path}/.fvcignore`))){
        let ignore = fs.readFileSync(path.normalize(`${path}/.fvcignore`), 'utf8');
        let ignoreListRaw = ignore.split('\n');

        let ignoreList = [];

        ignoreListRaw.forEach((i) => {
            ignoreList.push(path.normalize(`${path}/${i}`));
        });

        ignoreList.push(path.normalize(`${path}/.fvc`));

        return ignoreList;
    } else {
        let ignoreList = [];
        ignoreList.push(path.normalize(`${path}/.fvc`));
        return ignoreList;
    }
}

module.exports = {
    logFileTemplate,
    currentDir,
    currentFolder,
    archiveDir,
    currentDate,
    dateToReadable,
    readLog,
    writeLog,
    getAllFiles,
    getAllNonIgnoredFiles,
    getIgnoreFiles
};