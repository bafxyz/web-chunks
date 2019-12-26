import merge from 'webpack-merge'
import nodeExternals from 'webpack-node-externals'

import eslintLoader from '../loaders/eslint'
import babelLoader from '../loaders/babel'
import mjsLoader from '../loaders/mjs'
import sourceMapLoader from '../loaders/source-map'

import { paths } from '../paths'
import { IProps, EEnv } from '../types'

import configProd from './production'
import configDev from './development'

export default (props: IProps) => {
    const { env = EEnv.DEVELOPMENT } = props

    return merge(env === EEnv.PRODUCTION ? configProd(props) : configDev(props), {
        entry: `${paths.src}/index.ts`,

        target: 'node',

        externals: [nodeExternals()], // Need this to avoid error when working with Express

        output: {
            filename: 'index.js',
            path: paths.dist
        },

        module: {
            rules: [
                // Lint JavaScript/TypeScript files.
                eslintLoader(),
                // Bundle JavaScript, and transform to ES6 using Babel.
                babelLoader(),
                // Mjs type handler
                mjsLoader(),
                // Creates source maps.
                sourceMapLoader()
            ]
        },

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            alias: {
                '~': paths.src,
                '@': paths.nodeModules,
                'react-dom': '@hot-loader/react-dom'
            }
        }
    })
}
