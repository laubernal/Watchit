#!/usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');

program
    .version('1.0.0')
    .argument('[filename]', 'Name of a file')
    .action((args) => {
        console.log(args);
    });

program.parse(process.argv);

const start = debounce(() => {
    console.log('File added');
}, 100);

chokidar.watch('.')
    .on('add', start)
    .on('change', () => console.log('File changed'))
    .on('unlink', () => console.log('File unlinked'));