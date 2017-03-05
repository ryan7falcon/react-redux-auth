// Development configuration for webpack
'use strict'

var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'eval-source-map',
  // this tells webpack what the starting point for our app is
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/index.js'),
  ],
  // the output for compiled files
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    // takes html template from ./app/index.html and injects link to js there.
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],

  // this tells webpack what loaders to use when dealing with different file types
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.json?$/,
      loader: 'json',
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        },
      ],

    },
    {
      test: /\.svg$/,
      loader: 'url-loader', // the loader used for svg support
    },
    ],
  },

  // this allows to do stuff like "import { something } from 'components' " instead of "./app/components"
  resolve: {
    modules: [
      path.resolve('./app'),
      'node_modules',
    ],
  },
}
