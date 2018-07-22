const path = require('path');

module.exports = {
  entry: {
    main: './src/mono-app.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/'),
  },
  module: {
    rules: [
      {
        test: /\.template.html$/,
        use: 'html-loader',
      },
    ],
  },
  devtool: 'source-map',
};