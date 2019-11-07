const paths = require('../paths')
const { api, root } = paths
const webpack = require('webpack')

module.exports = () => {
    return {
        entry: {
            index: [api.index]
        },

        output: {
            // Next line is not used in dev but WebpackDevServer crashes without it:
            path: root.public,
            // Webpack uses `publicPath` to determine where the app is being served from.
            // In development, we always serve from the root. This makes config easier.
            publicPath: '/',
            // This does not produce a real file. It's just the virtual path that is
            // served by WebpackDevServer in development. This is the JS bundle
            // containing code from all our entry points, and the Webpack runtime.
            filename: '[name].[hash].js',
            libraryTarget: 'umd'
        },

        devtool: 'eval-source-map',

        devServer: {
            hot: true,
            contentBase: root.public,
            publicPath: '/',
            historyApiFallback: true,
            disableHostCheck: true
        },

        plugins: [new webpack.HotModuleReplacementPlugin()]
    }
}
