const path = require('path')

module.exports = {
	mode: 'development',
	entry: './src/main.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.js'],
	},
}
