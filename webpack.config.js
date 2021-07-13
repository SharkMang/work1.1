const path = require('path');

module.exports = {
  watch: true,
  mode: 'development',
  entry: './app.js',
  module: {
    rules: [
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.svg$/, use: 'svg-inline-loader' },
      { test: /\.(png|jpe?g|gif)$/i, use: [ 'file-loader' ] },
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
};
