const fs = require('fs');

module.exports = function readJson(jsonFilePath) {
  return JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
};
