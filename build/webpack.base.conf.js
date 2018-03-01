var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    app: process.argv.indexOf('--docs') > 0 ? './docs/docs.js' : './example/index.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@static': path.resolve(__dirname, '../static'),
      '@mixins': path.resolve(__dirname, '../src/mixins'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@docs': path.resolve(__dirname, '../docs'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@plugins': path.resolve(__dirname, '../src/plugins'),
      '@asserts': path.resolve(__dirname, '../src/asserts'),
      'vue$': 'vue/dist/vue.common.js',
    }
  },
  externals: {
    // 'vue': 'Vue',
    // 'vue-d3': 'VueD3'
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders()
  },
  node: {
    child_process: 'empty',
    fs: 'empty'
  }
}
