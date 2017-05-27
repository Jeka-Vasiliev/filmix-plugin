const webpack = require('webpack')
const path = require('path')

const devEnv = 'development'
const prodEnv = 'production'

module.exports = (outerEnv) => {
  const env = outerEnv || devEnv

  const config = {
    entry: path.resolve('./src/index.js'),
    output: {
      filename: 'main.js',
      path: path.resolve('./dist')
    },
    module: {
      rules: [
        { test: /\.js$/, loader: 'babel-loader' }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
      })
    ]
  }

  if (env === devEnv) {
    config.devtool = 'source-map'
  }

  if (env === prodEnv) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin())
  }

  return config
}
