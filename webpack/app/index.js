const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const loaders = require('./loaders')
const paths = require('./paths')
const { eslintLoader, babelLoader } = loaders
const { appBuild, appFavicon, appHtml, appNodeModules, appPublic, appSrc } = paths

module.exports = params => {
    const { environment, analysis } = params
    const config = {
        environment: environment ? environment : 'development',
        analysis: analysis ? analysis : false
    }
    const mode = config.environment
    const isDev = config.environment === 'development'

    console.info('*** Environment:', config.environment)

    return merge(
        {
            mode,
            context: appSrc,
            module: {
                rules: [eslintLoader(), babelLoader()]
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
                modules: [appSrc, appNodeModules],
                alias: {
                    '@': appSrc
                }
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: appHtml,
                    favicon: appFavicon,
                    hash: isDev
                }),
                new CopyWebpackPlugin([
                    {
                        from: appPublic + '/manifest.json',
                        to: appBuild + '/manifest.json'
                    }
                ]),
                new webpack.DefinePlugin({
                    VERSION: JSON.stringify(require('../package.json').version)
                }),
                new webpack.HashedModuleIdsPlugin()
            ]
        },
        require('./' + config.environment)({ ...config, isDev })
    )
}
