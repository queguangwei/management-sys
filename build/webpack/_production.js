import webpack           from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpackConfig     from './_base'

webpackConfig.output.filename = '[name].[hash].js'

const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin(
  'vendor', '[name].[hash].js'
)

commonChunkPlugin.__KARMA_IGNORE__ = true

webpackConfig.plugins.push(
  commonChunkPlugin,
  new ExtractTextPlugin('[name].[contenthash].css'),
  new webpack.optimize.UglifyJsPlugin()
)

webpackConfig.eslint.failOnError = true

export default webpackConfig
