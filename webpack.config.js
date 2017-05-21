const path = require('path')

module.exports = () => ({
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve('./builds'),
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader' }
    ]
  }
});
