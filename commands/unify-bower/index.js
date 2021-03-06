const fs = require('fs');
const {
  listFileInPackages
} = require('../list-file-in-packages/list-file-in-packages');
const path = require('path');
const readJson = require('../read-json');
const semverSort = require('semver-sort');
const util = require('util');
const { root_path, install } = require('yargs')
  .default('install', false)
  .argv;
const execPromise = util.promisify(require('child_process').exec);
const resolvedRootPath = path.resolve(root_path);
const lernaPackages = readJson(`${resolvedRootPath}/lerna.json`)
  .packages
  .map(package => `${resolvedRootPath}/${package}`);
const bowerReducer = (acc, next) => {
  const { dependencies, name } = next;

  Object.keys(dependencies).forEach(dep => {
    if (acc[dep] === undefined) {
      acc[dep] = {
        dependents: [ name ],
        versions: [ dependencies[dep] ]
      };
    } else {
      if (acc[dep].dependents.indexOf(name) === -1) {
        acc[dep].dependents.push(name);
      }
      if (acc[dep].versions.indexOf(dependencies[dep]) === -1) {
        acc[dep].versions.push(dependencies[dep]);
      }
    }
  });

  return acc;
};

const dependencyDescriptorReducer = (descriptorMap) => {
  return Object.keys(descriptorMap).reduce((acc, next) => {
    const {
      versions
    } = descriptorMap[next];
    // Only select the first element as the version to use.
    acc[next] = semverSort.asc(versions).pop();

    return acc;
  }, {});
}
console.log('[INFO] Generating unified bower.json...');
let bowerList = [];

listFileInPackages('bower.json', lernaPackages)
  .then(result => {
    bowerList = result.map(r => r.replace('bower.json', ''))
    return result;
  })
  .then(result => result.map(bower => readJson(bower)))
  .then(result => result.filter(bower => bower.dependencies))
  .then(result => result.reduce(bowerReducer, {}))
  .then(result => dependencyDescriptorReducer(result))
  .then(result => {
    const rootBower = readJson(`${resolvedRootPath}/bower.json`);

    rootBower.dependencies = result;

    return JSON.stringify(rootBower, null, 2);
  })
  .then(result => {
    fs.writeFileSync(`${resolvedRootPath}/bower.json`, result);

    if (install) {
      console.log('[INFO] Installing bower dependencies...');
      execPromise(`cd ${resolvedRootPath}; bower install`)
        .then(() => {
          console.log('[INFO] Install successful.');
        })
        .then(() => {
          console.log('[INFO] Linking common bower_components to lerna packages...');
          const rootBowerFolder = `${resolvedRootPath}/bower_components`;

          bowerList.forEach((pack) => {
            fs.link(rootBowerFolder, `${pack}/bower_components`, () => {
              console.log(`[INFO]   Linked with ${pack}`);
            });
          });
        })
    }

    return result;
  });
