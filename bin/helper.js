const fs = require("fs-extra");
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
    return process.cwd();
}

function currentFolder(){
    let currentDir = process.cwd();
    let folderPathArr = currentDir.split('/');
    return folderPathArr[folderPathArr.length - 1];
}

function archiveDir(){
    return `${process.cwd()}/.fvc`
}

function currentDate(){
    return Date.now();
}

function dateToReadable(date){
    let newDate = new Date(date);
    return `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`;
}

function readLog(){
    let logFileRaw = fs.readFileSync(`${currentDir()}/.fvc/log.json`);
    return JSON.parse(logFileRaw);
}

function writeLog(logObj){
    fs.writeFileSync(`${currentDir()}/.fvc/log.json`, JSON.stringify(logObj));
}

function getAllFiles(dirPath = currentDir(), arrayOfFiles) {

    files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
        if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
            arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles);
        } else {
            arrayOfFiles.push(`${dirPath}/${file}`);
        }
    });

    return arrayOfFiles;
}

function getAllNonIgnoredFiles(dirPath = currentDir(), arrayOfFiles) {

    let ignoreFiles = getIgnoreFiles(dirPath);

    let files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
        if(!ignoreFiles.includes(`${dirPath}/${file}`)){
            if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
                arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles);
            } else {
                arrayOfFiles.push(`${dirPath}/${file}`);
            }
        }
    });

    return arrayOfFiles;
}

function getIgnoreFiles(path = currentDir()){
    if(fs.existsSync(`${path}/.fvcignore`)){
        let ignore = fs.readFileSync(`${path}/.fvcignore` , 'utf8');
        let ignoreListRaw = ignore.split('\n');

        let ignoreList = [];

        ignoreListRaw.forEach((i) => {
            ignoreList.push(`${path}/${i}`);
        });

        ignoreList.push(`${path}/.fvc`);

        return ignoreList;
    } else {
        let ignoreList = [];
        ignoreList.push(`${path}/.fvc`);
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