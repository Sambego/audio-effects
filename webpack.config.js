var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src',
    output: { path: __dirname + '/dist', filename: 'pedalboard.js' },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                include: __dirname + '/src',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
};