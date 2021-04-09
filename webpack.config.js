const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	mode: 'development',
	entry: './src/main.ts',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [/\.vue$/],
				},
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								indentedSyntax: true,
							},
						},
					},
				],
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
		alias: {
			vue$: 'vue/dist/vue.esm.js',
		},
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './src/index.html',
		}),
		new VueLoaderPlugin(),
	],
}
