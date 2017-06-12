const webpack = require('webpack')
const path = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')

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
        { test: /\.jsx?$/, loader: 'babel-loader' },
        { test: /\.tsx?$/, loader: ['babel-loader', 'awesome-typescript-loader'] }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', 'ts', 'tsx']
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
      })
    ]
  }

  if (env === devEnv) {
    config.devtool = 'source-map'
    config.plugins.push(new CheckerPlugin())
  }

  if (env === prodEnv) {
    config.plugins.push(new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }))
  }

  return config
}
