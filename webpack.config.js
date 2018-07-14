const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    background: path.resolve('./src/background'),
    inject: path.resolve('./src/inject'),
    options: path.resolve('./src/options')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('./dist')
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: ['ts-loader'], exclude: /node_modules/ }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx']
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin(['src/manifest.json', 'src/options.html']),
  ]
}
