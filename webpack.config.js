const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  module: {
    rules: [
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.svg$/, use: [ 'svg-inline-loader' ]},
      { test: /\.(png|jpe?g|gif)$/i, use: [ 'file-loader' ] },
      { test: /\.js$/, exclude: /node_modules/, use: [ "babel-loader" ]}
    ]
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './build'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
    disableHostCheck: true
  }
};
