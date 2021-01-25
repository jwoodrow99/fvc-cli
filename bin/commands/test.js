const fs = require("fs-extra");
const inquirer = require('inquirer');
const kleur = require('kleur');
const boxen = require('boxen');
const ora = require('ora');
const helper = require('../helper');



function main(){

    let ignore = fs.readFileSync(`${helper.currentDir()}/.fvcignore` , 'utf8')
    ignore = ignore.split('\n');
    console.log(ignore);

    //let workingContents = fs.readdirSync(helper.currentDir());
    let workingContents = getAllFiles(helper.currentDir());
    workingContents.forEach(i => {
        console.log(i);
    });
}

module.exports = {
    main
};