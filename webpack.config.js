const webpack = require('webpack')
const path = require('path')

const devEnv = 'development'
const prodEnv = 'production'

module.exports = (outerEnv) => {
  const env = outerEnv || devEnv

  const config = {
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
    mode: env,
  }

  if (env === devEnv) {
    config.devtool = 'source-map'
  }
  return config
}
