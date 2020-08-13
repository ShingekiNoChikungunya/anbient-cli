#!/usr/bin/env node
require('yargs')
    .command(require('./commands/search.command'))
    .command(require('./commands/visit.command'))
    // .command(require('./commands/download.command'))
    .demandCommand()
    .help()
    .argv
