"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productionConfig = void 0;

var _terserWebpackPlugin = _interopRequireDefault(require("terser-webpack-plugin"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _paths = require("./paths");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var productionConfig = function productionConfig() {
  return {
    // Set common production options. <goo.gl/nYfBtH>
    mode: 'production',
    // Enable source maps for production (in a separate file, so they
    // will only load if the user has dev tools open).
    devtool: 'source-map',
    // Splits code to multiple chunks
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 200000
      },
      minimizer: [new _terserWebpackPlugin["default"]({
        parallel: true,
        terserOptions: {
          safari10: true
        }
      })]
    },
    plugins: [new _htmlWebpackPlugin["default"]({
      inject: true,
      template: _paths.paths.indexHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })]
  };
};

exports.productionConfig = productionConfig;