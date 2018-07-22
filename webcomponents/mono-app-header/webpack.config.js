const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'mono-app-header': './src/mono-app-header.js',
  },
  mode: process.env.BUILD_MODE || 'production',
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