const fs = require('fs');
const chalk = require('chalk');

const debounce = (func, delay = 1000) => {
  let timeoutId;

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const fileExists = async (filename) => {
  try {
    await fs.promises.access(filename);
  } catch (err) {
    throw new Error(chalk.red(`Utils.fileExists \nError: Could not find the file ${filename}`));
  }
};

module.exports.debounce = debounce;
module.exports.fileExists = fileExists;
