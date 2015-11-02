var vue = require('vue-loader')
var webpack = require('webpack')

module.exports = {
  entry: './main.js',
  output: {   
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        // excluding some local linked packages.
        // for normal use cases only node_modules is needed.
        exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: 'babel?optional[]=runtime&loose=all'
      }
    ]
  }
}