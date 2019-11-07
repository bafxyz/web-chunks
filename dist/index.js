"use strict";

var webpack = require('webpack');

var merge = require('webpack-merge');

var CleanWebpackPlugin = require('clean-webpack-plugin');

var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var WebpackAssetsManifest = require('webpack-assets-manifest'); // Default Webpack configuration
// @see: https://webpack.js.org/configuration/


var baseConfig = {
  entry: {// ...
  },
  output: {
    filename: '[name]-[chunkhash].js',
    path: 'dist'
  },
  module: {
    rules: [// Bundle JavaScript, and transform to ES5 using Babel.
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }, // Bundle static assets, either hashing filename or inlining into bundle if under 8KB
    {
      test: /\.(png|jpe?g|eot|gif|woff2?|svg|ttf)$/,
      use: ['url-loader?limit=8192']
    }, // Bundle CSS stylesheets and process with PostCSS, extract to single CSS file per bundle.
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap', 'postcss-loader']
    }, // Bundle SCSS stylesheets (processed with LibSass & PostCSS), extract to single CSS file per bundle.
    {
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']
    }]
  },
  plugins: [// Extract all stylesheets referenced in each bundle into a single CSS file.
  new MiniCssExtractPlugin({
    filename: '[name]-[chunkhash].css',
    chunkFilename: '[id].css'
  }), // Create asset manifest (allowing Laravel or other apps to get hashed asset names).
  new WebpackAssetsManifest({
    output: 'rev-manifest.json'
  })],
  stats: {
    // Don't print noisy output for extracted CSS children.
    children: false
  }
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

    var config = merge(baseConfig, environmentConfig, options); // Apply any final options based on the merged config.

    var extraConfig = {
      plugins: [// Set NODE_ENV based on the provided Webpack environment.
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development')
      }), // Clean the output path before builds.
      new CleanWebpackPlugin()]
    };
    return merge(config, extraConfig);
  };
};