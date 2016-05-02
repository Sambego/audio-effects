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
            },{
                test: /\.ogg/,
                loader: 'file',
                include: __dirname + '/src/audio',
            }
        ]
    },
};
