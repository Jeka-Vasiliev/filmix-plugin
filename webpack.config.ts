import * as CleanWebpackPlugin from 'clean-webpack-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as path from 'path'
import { Configuration } from 'webpack'

interface Env { [key: string]: string }
interface Argv { mode: Configuration['mode'] }

export default (_: Env, { mode }: Argv): Configuration => ({
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
      { test: /\.tsx?$/, loader: ['babel-loader'], exclude: /node_modules/ },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{ from: 'src/manifest.json' }, { from: 'src/options.html' }]),
  ],
  mode,
  devtool: mode === 'development' ? 'source-map' : false,
})
