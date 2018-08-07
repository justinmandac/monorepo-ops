const { globPromise, execPromise } = require('../command-utils');

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
 * Flattens the array of node-glob results.
 * @param {Array<Array<string>>} globResults
 * @return {Array<string>}
*/
function globResultReducer(globResults) {
  return globResults.reduce((acc, next) => acc.concat(next), []);
}

module.exports.globResultReducer = globResultReducer;

/**
 * @param {string} file File to search for amongst lerna packages
 *  (ie package.json, bower.json, etc.)
 * @param {Array<string>} packagesList List of globs where lerna packages can
 *   be found.
 * @param {function(string): Promise<Array>} reader Function that reads from
 *   the provided glob.
 * @return {Promise<Array<string>>}
*/
function listFileInPackages(file, packagesList, reader = globPromise) {
  return Promise.all(
    packagesList.map(package => reader(package))
  )
  .then(result => result.filter(globResult => globResult.length))
  .then(globResultReducer)
  .then(packageDirs => listFileFromPaths(file, packageDirs));
}

module.exports.listFileInPackages = listFileInPackages;
