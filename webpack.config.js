// webpack v4 set install
//npm install webpack webpack-cli babel-core babel-loader babel-preset-env css-loader extract-text-webpack-plugin html-webpack-plugin jquery mini-css-extract-plugin node-sass sass-loader style-loader

//To fix it, compatibility issue ExtractTextPlugin
//npm install -D extract-text-webpack-plugin@next


const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'development',
    // entry: { 
    //     head: path.resolve(__dirname,'src/js/index.js'),
    //     body: path.resolve(__dirname,'src/js/body.js')
    // },
    entry: path.resolve(__dirname,'src/app.js'),
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: '[name].bundle.js'
    },
    node:{
        __dirname: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: [
                    'css-loader',
                    'sass-loader'
                ],
                  publicPath: '/dist'
                })
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: false,
            allChunks: true
        })
    ]
};