const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const hotModuleMiddleware = require("webpack-hot-middleware")
const config = require('../webpack.dev.config')

const compiler = webpack(config)
const middlewareOptions = {
    stats: { colors: true },
    noInfo: true,  // Comment this out for more verbose webpack information
    publicPath: '/nhl-stats/scripts/' // should match your webpack.dev.config
};

module.exports = {
    devMiddleware: webpackDevMiddleware(compiler, middlewareOptions),
    hotModuleMiddleware: hotModuleMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    })
}
