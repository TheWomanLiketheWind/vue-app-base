const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

/** @type {import('webpack').Configuration} */
module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    open: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
