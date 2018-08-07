const util = require('util');
const globPromise = util.promisify(require('glob'));
const execPromise = util.promisify(require('child_process').exec);

module.exports = {
  globPromise,
  execPromise,
};