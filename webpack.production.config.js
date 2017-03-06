// Production configuration for webpack
'use strict'

var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var StatsPlugin = require('stats-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  // starting point for the app
  entry: [
    path.join(__dirname, 'app/index.js'),
  ],

  // where to put compiled files
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/',
  },

  // what modules to use for compiling different file types
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.json?$/,
      loader: 'json',
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallbackLoader:  'style-loader',
        use: [
          {
            loader: 'css-loader',
            query: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]__[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      }),
    },
    { test: /\.jpg$/, loader: 'file-loader' },
    { test: /\.png$/, loader: 'url-loader?mimetype=image/png' },
    { test: /\.svg$/,
      loader: 'svg-url-loader', // the loader used for svg support
    },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        context: __dirname,
        postcss: [
          require('autoprefixer'),
        ],
      },
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),

    // takes the html template and injects liks to js and css
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
      },
    }),
    new CopyWebpackPlugin([
     // Copy /public/ folder contents to /dist/
      { from: 'app/public' },
    ]),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  // this allows to do stuff like "import { something } from 'components' " instead of "./app/components"
  resolve: {
    modules: [
      path.resolve('./app'),
      'node_modules',
    ],
  },
}
