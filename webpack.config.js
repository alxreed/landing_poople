const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dev = process.env.NODE_ENV === "dev"

let cssLoaders = [
    MiniCssExtractPlugin.loader,
    { loader: 'css-loader', options: { importLoaders: 1 } }
]

if (!dev) {
    cssLoaders.push(
        {
            loader: 'postcss-loader',
        }
    )
}

let config = {

    entry: {
        app: './assets/js/app.js',
    },

    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        publicPath: "/dist/",
    },

    watch: dev,
    devtool: dev ? "cheap-module-eval-source-map" : false,

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }

            },
            {
                test: /\.css$/,
                use: cssLoaders
            },
            {
                test: /\.scss$/,
                use: [
                    ...cssLoaders,
                    'sass-loader'
                ]
            },

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],

    mode: 'development'

}

if (!dev) {
    config.plugins.push(new UglifyJSPlugin({
        sourceMap: false
    }))
}

module.exports = config