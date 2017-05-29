var path = require('path');
var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    entry: ['./test/test.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: [
                        "transform-class-properties",
                        // "transform-remove-console"
                    ]
                }
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin()
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};