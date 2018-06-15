const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
  	contentBase: './dist',
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true,
  },
  plugins: [
  	new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
  ]
})