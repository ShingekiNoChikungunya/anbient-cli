#!/usr/bin/env node
require('yargs')
    .command(require('./commands/search.command'))
    .demandCommand()
    .help()
    .argv
