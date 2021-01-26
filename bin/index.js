#!/usr/bin/env node

// Import App Files
const init = require('./app/init.js');
const save = require('./app/save.js');
const destroy = require('./app/destroy.js');
const list = require('./app/list.js');
const info = require('./app/info.js');
const restore = require('./app/restore.js');

// Import Controller files
const server = require('./server.js');
const helper = require('./helper.js');

// Import Packages
const program = require('commander');
const inquirer = require('inquirer');
const kleur = require('kleur');

program
    .command(`init`)
    .description(`Create new FVC repo.`)
    .action(() => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'project',
                message: 'Project Name',
                default: helper.currentFolder(),
            },
            {
                type: 'input',
                name: 'author',
                message: 'Author Name',
                default: 'default',
            }
        ]).then(answers => {
            init(answers.project, answers.author);
        });
    });

program
    .command(`save <message>`)
    .description(`Create new FVC archive.`)
    .action((message) => {
        save(message);
    })

program
    .command(`destroy [archive_id]`)
    .description(`Destroy FVC archive in current directory.`)
    .action((archive_id) => {
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: 'Are you sure you want to remove this FVC archive'
            }
        ]).then(answers => {
            destroy(archive_id, answers.confirm);
        })
    });

program
    .command(`list`)
    .description(`List FVC archive in current directory.`)
    .action(() => {
        list();
    })

program
    .command(`info`)
    .description(`Output FVC archive info.`)
    .action(() => {
        info();
    })

program
    .command(`restore <archive_id>`)
    .description(`Overwrites working files with archived files.`)
    .option('-f, --full', 'Completely mirrors working directory to archive.')
    .action((archive_id, args) => {
        if(args.full){
            console.log(kleur.red(`By FULL restoring an old archive, all working files will be removed.`));
        } else {
            console.log(kleur.red(`By restoring an old archive, all restored files will be overwritten.`));
        }

        console.log(kleur.yellow(`It is reccomended to make an archive before resoring a previous archive!`));

        inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: 'Do you wish to restore this archive?'
            }
        ]).then(answers => {
            if(answers.confirm){
                if(args.full){
                    restore.full(archive_id);
                } else {
                    restore.restore(archive_id);
                }
            } else {
                console.log(kleur.red(`FVC archive was not restored`));
            }
        });
    });

program
    .command(`gui [port]`)
    .description(`Create GUI server`)
    .action((port) => {
        server.main(port);
    })

program.parse(process.argv);