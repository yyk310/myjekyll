var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
  entry: "./example.js",
  output: {
    filename: 'bundle.js'       
  },
    plugins: [
        new uglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
    ]
};