const fs = require("fs-extra");
const inquirer = require('inquirer');
const kleur = require('kleur');
const boxen = require('boxen');
const ora = require('ora');
const helper = require('../helper');

function main(){

    inquirer.prompt([
        {
            type: 'confirm',
            name: 'delete',
            message: 'Are you sure you want to remove this FVC archive'
        }
    ]).then(answers => {
        if(answers.delete === true){
            fs.rmdirSync(helper.archiveDir(), {recursive: true});
            console.log(kleur.green(`FVC archive was removed`));
        } else {
            console.log(kleur.yellow(`FVC archive was NOT removed`));
        }
    });
}

module.exports = {
    main,
};