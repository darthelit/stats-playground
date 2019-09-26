const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    stats: 'verbose',
    devtool: 'source-map',
    entry: [
        '@babel/polyfill',
        './src/scripts/main',
    ],
    module: {
        rules: [
          {test: /.json$/, use: 'json-loader', exclude: /node_modules/},
          {test: /.jsx?$/, use: 'babel-loader', exclude: /node_modules/},
          {
            test: /\.scss|\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [
                require('path').resolve(__dirname, 'node_modules')
                ],
              },
              publicPath: '/nhl-stats/styles/'
              }
            }]
          }
        ],
    },
    output: {
        filename: 'bundle.js',
        path: `${__dirname}/public/scripts/`,
        publicPath: '/nhl-stats/scripts/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.IgnorePlugin(/regenerator|nodent|js-beautify/, /ajv/),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new MiniCssExtractPlugin({
            filename: '../styles/style.css'
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false
                    },
                    dead_code: true,
                    minimize: true
                }
            })
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.json',
            '.jsx'
        ]
    }
}
