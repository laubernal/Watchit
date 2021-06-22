#!/usr/bin/env node

const program = require('caporal');
const watchit = require('./watchit');

program
  .version('1.0.0')
  .argument('[file]', 'Name of a file')
  .action(watchit);

  program.parse(process.argv);