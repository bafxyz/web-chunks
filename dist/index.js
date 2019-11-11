"use strict";

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _cleanWebpackPlugin = require("clean-webpack-plugin");

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Default Webpack configuration
// @see: https://webpack.js.org/configuration/
var baseConfig = {
  entry: {
    app: process.cwd() + '/src/index.ts'
  },
  output: {
    filename: '[name]-[chunkhash].js',
    path: process.cwd() + '/dist'
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
  plugins: [// Extract all stylesheets referenced in each bundle into a single CSS file.
  new _miniCssExtractPlugin["default"]({
    filename: '[name]-[chunkhash].css',
    chunkFilename: '[id].css'
  }), // Create asset manifest (allowing Laravel or other apps to get hashed asset names).
  new _webpackAssetsManifest["default"]({
    output: 'rev-manifest.json'
  })]
}; // Options that should only be applied in development builds:

var developmentConfig = {
  // Set common development options. <goo.gl/3h6o6p>
  mode: 'development',
  // Enable source maps for development (inline, with faster rebuilds).
  devtool: 'cheap-module-source-map'
}; // Options that should only be applied in production builds:

var productionConfig = {
  // Set common production options. <goo.gl/nYfBtH>
  mode: 'production',
  // Enable source maps for production (in a separate file, so they
  // will only load if the user has dev tools open).
  devtool: 'source-map'
}; // Export a `configure()` function for applications to
// import & extend in their `webpack.config.js` files.

module.exports = function (options) {
  return function (env) {
    var isProduction = env === 'production';
    var environmentConfig = isProduction ? productionConfig : developmentConfig; // Merge our base config, environment overrides, and per-app overrides.

    var config = (0, _webpackMerge["default"])(baseConfig, environmentConfig, options); // Apply any final options based on the merged config.

    var extraConfig = {
      plugins: [// Set NODE_ENV based on the provided Webpack environment.
      new _webpack["default"].DefinePlugin({
        NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development')
      }), // Clean the output path before builds.
      new _cleanWebpackPlugin.CleanWebpackPlugin()]
    };
    return (0, _webpackMerge["default"])(config, extraConfig);
  };
};