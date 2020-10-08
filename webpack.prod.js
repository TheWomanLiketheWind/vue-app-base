const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

/** @type {import('webpack').Configuration} */
module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'nosources-source-map',
  optimization: {
    usedExports: true, // 标记未引用代码
    minimize: true, //移除未使用代码
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '.' }
      ]
    })
  ]
})

// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const { merge } = require('webpack-merge')
// const common = require('./webpack.common')

// module.exports = merge(common, {
//   // 生产环境
//   mode: 'production',
//   devtool: false,
//   optimization: {
//     usedExports: true
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new CopyWebpackPlugin({
//       patterns: [
//         { from: 'public', to: '.' }
//       ]
//     })
//   ]
// })
