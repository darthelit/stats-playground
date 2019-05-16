const { assignIn: _assignIn, clone: _clone } = require('lodash');
const webpack = require('webpack');

module.exports = _assignIn(_clone(require('./webpack.config')), {
  mode: 'development',
  entry: [
      'webpack-hot-middleware/client?path=http://localhost:3269/__webpack_hmr?reload=true',
      '@babel/polyfill',
      'react-hot-loader/patch',
      './src/scripts/main'
  ],
  module: {
          rules: [
            {test: /.json$/, use: 'json-loader', exclude: /node_modules/},
            {test: /.jsx?$/, use: 'babel-loader', exclude: /node_modules/},
            {
              test: /\.scss|\.css$/,
              use: ["style-loader", 'css-loader', {
                "loader": "sass-loader",
                options: {
                  "includePaths": [
                    require('path').resolve(__dirname, 'node_modules')
                  ]
                }
              }]
            }
          ]
  },
  devtool: 'cheap-module-inline-source-map',
  plugins: [
      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: '"development"'
          }
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.IgnorePlugin(/regenerator|nodent|js-beautify/, /ajv/)
  ]
}
);