const webpack = require('webpack')
const path = require('path')

const devEnv = 'development'
const prodEnv = 'production'

module.exports = (outerEnv) => {
  const env = outerEnv || devEnv

  const config = {
    entry: {
      background: path.resolve('./src/background'),
      inject: path.resolve('./src/inject')
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve('./dist')
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
    config.plugins.push(new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }))
  }

  return config
}
