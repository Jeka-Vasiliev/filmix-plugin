import * as CleanWebpackPlugin from 'clean-webpack-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as path from 'path'
import { Configuration } from 'webpack'

const config: Configuration = {
  entry: {
    background: path.resolve('./src/background'),
    inject: path.resolve('./src/inject'),
    options: path.resolve('./src/options'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('./dist'),
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: ['ts-loader'], exclude: /node_modules/ },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{ from: 'src/manifest.json' }, { from: 'src/options.html' }]),
  ],
}

export default config
