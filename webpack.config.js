const path = require('path')

module.exports = {

    entry: './assets/app.js',

    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js',
    },

    watch: true,

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']

            },

        ]
    },

    mode: 'development'

}