const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractCSS = new ExtractTextPlugin('[name]-css.css');
const ExtractSASS = new ExtractTextPlugin('[name]-sass.css');

module.exports = {
  entry: path.join(__dirname,'src/app.js'),
  output: {
      path: path.join(__dirname, 'bundle'),
      filename: '[name].bundle.js',
      publicPath: '/bundle'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader : "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ExtractCSS.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        use: ExtractSASS.extract({
          fallback: "style-loader",
          use: [
            {
                loader: "css-loader",
                options: {
                    url: false,
                    minimize: true,
                    sourceMap: true
                }
            }, 
            {
                loader: "sass-loader",
                options: {
                    sourceMap: true
                }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    ExtractCSS,
    ExtractSASS,
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]



};
