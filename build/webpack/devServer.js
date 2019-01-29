require('babel-core/register')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var webpackConfig = require('./_development').default
var config = require('../../config').default
var paths = config.get('utils_paths')

var compiler = webpack(webpackConfig)
var server = new WebpackDevServer(compiler, {
  contentBase: `http://${config.get('server_host')}:${config.get('server_port')}`,
  hot: true,
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  inline: true,
  filename: "app.js",
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  publicPath: '/',
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: { colors: true }
})

server.listen(config.get('webpack_port'), "localhost", function() {
  console.log('webpack dev server started!')
})
