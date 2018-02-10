var path = require('path');
module.exports = {
    entry: {
        app: ['./src/app.js']
    },
    output: {
        path: path.resolve('build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: [require('@babel/plugin-proposal-object-rest-spread')]
              }
            }
          }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
