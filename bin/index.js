#!/usr/bin/env node

// Import Commands
const init = require('./commands/init.js');
const save = require('./commands/save.js');
const destroy = require('./commands/destroy.js');
const list = require('./commands/list.js');
const info = require('./commands/info.js');
const restore = require('./commands/restore.js');

const program = require('commander');

program
    .command(`init`)
    .description(`Create new FVC repo.`)
    .action(() => {
        init.main();
    })

program
    .command(`save <message>`)
    .description(`Create new FVC archive.`)
    .action((message) => {
        save.main(message);
    })

program
    .command(`destroy [archive_id]`)
    .description(`Destroy FVC archive in current directory.`)
    .action((archive_id) => {
        destroy.main(archive_id);
    })

program
    .command(`list`)
    .description(`List FVC archive in current directory.`)
    .action(() => {
        list.main();
    })

program
    .command(`info`)
    .description(`Output FVC archive info.`)
    .action(() => {
        info.main();
    })

program
    .command(`restore <archive_id>`)
    .description(`Overwrites working files with archived files.`)
    .option('-f, --full', 'Completely mirrors working directory to archive.')
    .action((archive_id, args) => {
        restore.main(archive_id, args);
    })

program.parse(process.argv);