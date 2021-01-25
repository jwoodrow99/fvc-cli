#!/usr/bin/env node

// Import Commands
const init = require('./commands/init.js');
const save = require('./commands/save.js');

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

program.parse(process.argv);