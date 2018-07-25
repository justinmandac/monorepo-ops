const path = require('path');

module.exports = {
  entry: {
    'mono-app-footer': './src/mono-app-footer.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname),
  },
  module: {
    rules: [
      {
        test: /\.template.html$/,
        use: 'html-loader',
      }
    ],
  },
};