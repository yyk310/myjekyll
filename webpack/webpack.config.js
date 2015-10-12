var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
    entry: "./entry.js",
    output: {        
        filename: "bundle.js"
    },
    module: {
       loaders:[
            { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    plugins: [
        new uglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
    ]
};