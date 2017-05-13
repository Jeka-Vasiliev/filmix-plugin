module.exports = {
  entry: './index.js',
  output: {
    filename: '[name].bundle.js',
    path: './builds',
    library: 'plugin'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel'
    }]
  }
}
