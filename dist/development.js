"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.developmentConfig = void 0;

var _webpack = _interopRequireDefault(require("webpack"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _paths = require("./paths");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var developmentConfig = function developmentConfig() {
  return {
    // Set common development options. <goo.gl/3h6o6p>
    mode: 'development',
    // Enable source maps for development (inline, with faster rebuilds).
    devtool: 'cheap-module-source-map',
    output: {
      // Webpack uses `publicPath` to determine where the app is being served from.
      // In development, we always serve from the root. This makes config easier.
      publicPath: '/',
      // This does not produce a real file. It's just the virtual path that is
      // served by WebpackDevServer in development. This is the JS bundle
      // containing code from all our entry points, and the Webpack runtime.
      filename: '[name].[hash].js',
      libraryTarget: 'umd'
    },
    devServer: {
      hot: true,
      contentBase: _paths.paths["public"],
      publicPath: '/',
      historyApiFallback: true,
      disableHostCheck: true
    },
    plugins: [new _webpack["default"].HotModuleReplacementPlugin(), new _htmlWebpackPlugin["default"]({
      inject: true,
      template: _paths.paths.indexHtml
    })]
  };
};

exports.developmentConfig = developmentConfig;