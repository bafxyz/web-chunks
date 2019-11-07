const paths = require('../paths')
const { appNodeModules, appSrc } = paths

/**
 * Exprorts loader
 *
 * @return {Function} loader configuration
 */
module.exports = () => {
    return {
        test: /.tsx?$/,
        enforce: 'pre',
        exclude: appNodeModules,
        use: [
            {
                options: { eslintPath: require.resolve('eslint') },
                loader: require.resolve('eslint-loader')
            }
        ],
        include: appSrc
    }
}
