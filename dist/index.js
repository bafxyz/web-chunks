"use strict";

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _cleanWebpackPlugin = require("clean-webpack-plugin");

var _webpackAssetsManifest = _interopRequireDefault(require("webpack-assets-manifest"));

var _eslint = _interopRequireDefault(require("./loaders/eslint"));

var _babel = _interopRequireDefault(require("./loaders/babel"));

var _css = _interopRequireDefault(require("./loaders/css"));

var _sass = _interopRequireDefault(require("./loaders/sass"));

var _image = _interopRequireDefault(require("./loaders/image"));

var _fonts = _interopRequireDefault(require("./loaders/fonts"));

var _svgx = _interopRequireDefault(require("./loaders/svgx"));

var _raw = _interopRequireDefault(require("./loaders/raw"));

var _mjs = _interopRequireDefault(require("./loaders/mjs"));

var _sourceMap = _interopRequireDefault(require("./loaders/source-map"));

var _development = require("./development");

var _production = require("./production");

var _paths = require("./paths");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseConfig = {
  entry: {
    app: "".concat(_paths.paths.src, "/index.ts")
  },
  output: {
    filename: '[name]-[chunkhash].js',
    path: _paths.paths.dist
  },
  module: {
    rules: [// Lint JavaScript/TypeScript files.
    (0, _eslint["default"])(), // Bundle JavaScript, and transform to ES6 using Babel.
    (0, _babel["default"])(), // Bundle CSS stylesheets and process with PostCSS, extract to single CSS file per bundle.
    (0, _css["default"])(), // Bundle SCSS stylesheets (processed with LibSass & PostCSS), extract to single CSS file per bundle.
    (0, _sass["default"])(), // Bundle image with optimization
    (0, _image["default"])(), // Bundle fonts
    (0, _fonts["default"])(), // Allowing for inline usage of a SVG as a React component
    (0, _svgx["default"])(), // Bundles files as text
    (0, _raw["default"])(), // Mjs type handler
    (0, _mjs["default"])(), // Creates source maps.
    (0, _sourceMap["default"])()]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '~': _paths.paths.src,
      '@': _paths.paths.nodeModules,
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [// Create asset manifest (allowing Laravel or other apps to get hashed asset names).
  new _webpackAssetsManifest["default"]({
    output: 'rev-manifest.json'
  })]
}; // Export a `config()` function for applications to
// import & extend in their `webpack.config.js` files.

module.exports = function (options) {
  return function (env) {
    var isProduction = env === 'production';
    var environmentConfig = isProduction ? (0, _production.productionConfig)() : (0, _development.developmentConfig)(); // Apply any final options based on the merged config.

    var extraConfig = {
      plugins: [// Set NODE_ENV based on the provided Webpack environment.
      new _webpack["default"].DefinePlugin({
        NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development')
      }), // Clean the output path before builds.
      new _cleanWebpackPlugin.CleanWebpackPlugin()]
    };
    var result = (0, _webpackMerge["default"])(baseConfig, environmentConfig, options, extraConfig);
    return result;
  };
};