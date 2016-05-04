var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: {
		'index': './app.entry.js',
	},
	output: {
		path: './build/',
		filename: '[name].js',
		pathinfo: true
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loader: 'babel',
			query: {
				cacheDirectory: true,
				presets: ['es2015']
			},
			exclude: /node_modules/
		}]
	},
	stats: {
		colors: true
	},
	devtool: 'source-map'
}
