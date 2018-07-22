const util = require('util');
const globPromise = util.promisify(require('glob'));
const execPromise = util.promisify(require('child_process').exec);

/**
 * @param {string} file File to find.
 * @param {Array<string>} dirs List of directories to search the file in.
 * @return {Promise<Array<string>>} List of file paths where the provided
 * file can be found.
*/
function listFileFromPaths(file, dirs) {
  return Promise.all(
    dirs.map(dir => execPromise(`ls ${dir}/${file}`)
      .then((result) => result.stdout.replace('\n', ''))
      .catch(() => {})
    )
  )
  .then(result => result.filter(i => i !== undefined));
}

/**
 * @param {string} file File to search for amongst lerna packages.
 * @param {Array<string>} packagesList List of globs where lerna packages can
 * be found.
 * @return {Promise<Array<string>>}
*/
module.exports = function listFileInPackages(file, packagesList) {
  return Promise.all(
    packagesList.map(package => globPromise(package))
  )
  .then(result => result.filter(globResult => globResult.length))
  .then(result => result.reduce((acc, next) => acc.concat(next), []))
  .then(result => listFileFromPaths(file, result));
}
