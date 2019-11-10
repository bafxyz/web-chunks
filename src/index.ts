import webpack from 'webpack'
import { WebpackOptions } from 'webpack/declarations/WebpackOptions'
import merge from 'webpack-merge'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import WebpackAssetsManifest from 'webpack-assets-manifest'

import { eslintLoader, sourceMapLoader, babelLoader, urlLoader, cssLoader, sassLoader } from './loaders'

// Default Webpack configuration
// @see: https://webpack.js.org/configuration/
const baseConfig = {
    entry: {
        app: process.cwd() + '/src/index.ts'
    },

    output: {
        filename: '[name]-[chunkhash].js',
        path: process.cwd() + '/dist'
    },

    module: {
        rules: [
            // Lint JavaScript/TypeScript files.
            eslintLoader(),
            // Creates source maps.
            sourceMapLoader(),
            // Bundle JavaScript, and transform to ES6 using Babel.
            // { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] }
            babelLoader(),
            // Bundle static assets, either hashing filename or inlining into bundle if under 8KB
            urlLoader(),
            // Bundle CSS stylesheets and process with PostCSS, extract to single CSS file per bundle.
            cssLoader(),
            // Bundle SCSS stylesheets (processed with LibSass & PostCSS), extract to single CSS file per bundle.
            sassLoader()
        ]
    },

    plugins: [
        // Extract all stylesheets referenced in each bundle into a single CSS file.
        new MiniCssExtractPlugin({
            filename: '[name]-[chunkhash].css',
            chunkFilename: '[id].css'
        }),

        // Create asset manifest (allowing Laravel or other apps to get hashed asset names).
        new WebpackAssetsManifest({
            output: 'rev-manifest.json'
        })
    ]
}

// Options that should only be applied in development builds:
const developmentConfig = {
    // Set common development options. <goo.gl/3h6o6p>
    mode: 'development',
    // Enable source maps for development (inline, with faster rebuilds).
    devtool: 'cheap-module-source-map'
}

// Options that should only be applied in production builds:
const productionConfig = {
    // Set common production options. <goo.gl/nYfBtH>
    mode: 'production',
    // Enable source maps for production (in a separate file, so they
    // will only load if the user has dev tools open).
    devtool: 'source-map'
}

// Export a `configure()` function for applications to
// import & extend in their `webpack.config.js` files.
module.exports = (options: WebpackOptions) => (env: string) => {
    const isProduction = env === 'production'
    const environmentConfig: any = isProduction ? productionConfig : developmentConfig

    // Merge our base config, environment overrides, and per-app overrides.
    const config = merge(baseConfig, environmentConfig, options)

    // Apply any final options based on the merged config.
    const extraConfig = {
        plugins: [
            // Set NODE_ENV based on the provided Webpack environment.
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development')
            }),
            // Clean the output path before builds.
            new CleanWebpackPlugin()
        ]
    }

    return merge(config, extraConfig)
}
