import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { paths } from './paths'

export const developmentConfig = () => ({
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
        contentBase: paths.public,
        publicPath: '/',
        historyApiFallback: true,
        disableHostCheck: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.indexHtml
        })
    ]
})
