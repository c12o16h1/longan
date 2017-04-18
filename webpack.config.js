var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './test/test.js',
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
                    plugins: ["transform-class-properties"]
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};