const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: './src/main.js', // 入口文件路径
  // 输出信息
  output: {
    filename: 'js/[name]-[hash:8].bundle.js' // hash 文件名
  },
  module: { // loader 配置
    rules: [
      {  // 处理js文件
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { // 编译 vue 文件
        test: /\.vue$/,
        use: 'vue-loader'
      },
      { // 处理图片资源
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024, // 用url-loader处理10KB以下
            esModule: false,
            name: 'img/[name]-[hash:8].[ext]'
          }
        }
      },
      { // 处理less
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      { // 处理css
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      { // eslint校验代码风格
        test: /\.(js|vue)$/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter') // 默认的错误提示方式
          }
        },
        enforce: 'pre',
        exclude: /node_modules/,
        include: [resolve('src')],
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      title: 'Vue Dome',
      url: '../public/'
    }),
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify('')
    })
  ],
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}
