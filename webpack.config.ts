import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'
import { Configuration } from 'webpack'
import ZipPlugin from 'zip-webpack-plugin'

interface Env {
	[key: string]: string
}
interface Argv {
	mode: Configuration['mode']
}

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
			{
				test: /\.tsx?$/,
				loader: ['babel-loader'],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx'],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'src/manifest.json' },
				{ from: 'src/options.html' },
			],
		}),
		...(mode === 'production'
			? [new ZipPlugin({ filename: 'filmix-random-worshipper' })]
			: []),
	],
	mode,
	devtool: mode === 'development' ? 'source-map' : false,
})
