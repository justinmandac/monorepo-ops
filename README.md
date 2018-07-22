# Mono Repo Operations

A repository for experimenting workflows in Lerna monorepos.

## Setup
1. Install lerna `npm i -g lerna`
2. Setup lerna packages. `lerna run bootstrap`

## Working with es6 modules and Bower components

1. Import lerna package.
2. List all internal dependencies of the Webcomponent being worked on.
3. Resolve the absolute path of each dependency.
4. Check for bower.json. If it exists, store the dependencies in memory. Else, skip.
5. From the stored list of bower dependencies, create a temporary `bower.json` file at the root of the project and place all of the bower dependencies there.
6. Run `bower install` at the project root.
7. Refering to the list of lerna packages w/ bower deps, symlink (or rsync) the root bower_components to each of them.
8. Profit