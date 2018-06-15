const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackDashboard = require('webpack-dashboard/plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: {
		main: './src/index.js'
	},
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: [ 'node_modules'],
				use: [{ loader: 'babel-loader' }]
			},
			{
				test: /\.s(a|c)ss$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' },
				],
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
				],
			}
		],
	},
	plugins: [
		new HtmlWebPackPlugin({ 
			template: './public/index.html',
			filename: 'index.html',
			title: 'React',
			inject: 'body',
		}),
		new CleanWebpackPlugin([ 'dist']),
		new webpack.BannerPlugin('Author: Mike Godley <michaelgodley@gmail.com>'),
		new WebpackDashboard(),
		new DuplicatePackageCheckerPlugin(),
		// new BundleAnalyzerPlugin(),
	],
}