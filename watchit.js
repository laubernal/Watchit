const chokidar = require('chokidar');
const { spawn } = require('child_process');
const chalk = require('chalk');
const { debounce, fileExists } = require('./utils');
const {
  DEFAULT_FILENAME,
  CHOKIDAR_ADD,
  CHOKIDAR_CHANGE,
  CHOKIDAR_UNLINK,
  DELAY_BETWEEN_FILE_EXECUTION,
} = require('./constants');

// proc = process (is a reserved keyword)
let proc;

const watchit = async ({ file }) => {
  const filename = file || DEFAULT_FILENAME;

  await fileExists(filename);

  const start = debounce(executeFile(filename), DELAY_BETWEEN_FILE_EXECUTION);

  chokidar.watch('.').on(CHOKIDAR_ADD, start).on(CHOKIDAR_CHANGE, start).on(CHOKIDAR_UNLINK, start);
};

const executeFile = (filename) => () => {
  if (proc) {
    proc.kill();
  }
  console.log(chalk.cyan('>>>>> Starting process...'));
  proc = spawn('node', [filename], { stdio: 'inherit' });
};

module.exports = watchit;
