const webpack = require('webpack')
const merge = require('webpack-merge')
const loaders = require('../loaders')
const paths = require('../paths')
const { eslintLoader, babelLoader } = loaders
const { api } = paths

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
            context: api.src,
            target: 'node',
            module: {
                rules: [eslintLoader(), babelLoader()]
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
                modules: [api.src, api.node_modules],
                alias: {
                    '@': api.src
                }
            },
            plugins: [new webpack.HashedModuleIdsPlugin()]
        },
        require('./' + config.environment)({ ...config, isDev })
    )
}
