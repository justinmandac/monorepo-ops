# List File in Package

Emits the absolute paths of the provided file from the indicated root path.

## Usage
`node index.js --root_path . --file bower.json`

### Params
* `root_path` - location of your lerna.json file from the `packages` field will be read.
* `file` - name of file to search within the list of `packages`. Defaults to bower.json.