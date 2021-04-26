const path = require('path');
const dev = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: [path.join(__dirname, '/src/index.ts')],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
        filename: 'polyfill_setImmediate.js',
        path: path.join(__dirname, '/lib'),
    },
    mode: dev ? 'development' : 'production',
};
