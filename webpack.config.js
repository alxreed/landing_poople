const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const dev = process.env.NODE_ENV === "dev"

let cssLoaders = [
    'style-loader',
    { loader: 'css-loader', options: { importLoaders: 1 } }
]

if (!dev) {
    cssLoaders.push(
        {
            loader: 'postcss-loader',
            options: {
                plugins: (loader) => [
                    require('autoprefixer')({
                        browsers: ['last 2 versions', 'ie > 8']
                    })
                ]
            }
        }
    )
}

let config = {

    entry: './assets/js/app.js',

    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js',
        publicPath: "/dist/",
    },

    watch: dev,
    devtool: dev ? "cheap-module-eval-source-map" : "source-map",

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
    ],

    mode: 'development'

}

if (!dev) {
    config.plugins.push(new UglifyJSPlugin({
        sourceMap: true
    }))
}

module.exports = config