const path = require('path');
const listFileInPackages = require('./list-file-in-packages');
const readJson = require('./read-json');
const {
  root_path,
  package_file,
  file
} = require('yargs')
      .default('file', 'bower.json')
      .default('package_file', 'lerna.json')
      .argv;

const resolvedRoot = path.resolve(root_path);

const prefixedPackages =
  readJson(`${resolvedRoot}/${package_file}`)
  .packages
  .map(package => `${resolvedRoot}/${package}`)

listFileInPackages(file, prefixedPackages)
  .then(r => r.forEach(i => console.log(i)))
