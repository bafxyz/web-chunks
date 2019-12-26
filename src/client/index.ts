import merge from 'webpack-merge'
import eslintLoader from '../loaders/eslint'
import babelLoader from '../loaders/babel'
import cssLoader from '../loaders/css'
import sassLoader from '../loaders/sass'
import imageLoader from '../loaders/image'
import fontsLoader from '../loaders/fonts'
import svgxLoader from '../loaders/svgx'
import rawLoader from '../loaders/raw'
import mjsLoader from '../loaders/mjs'
import sourceMapLoader from '../loaders/source-map'

import { paths } from '../paths'
import { IProps, EEnv } from '../types'

import configProd from './production'
import configDev from './development'

export default (props: IProps) => {
    const { env = EEnv.DEVELOPMENT } = props

    return merge(env === EEnv.PRODUCTION ? configProd(props) : configDev(props), {
        entry: {
            app: `${paths.src}/index.ts`
        },

        output: {
            filename: '[hash].js',
            path: paths.dist
        },

        module: {
            rules: [
                // Lint JavaScript/TypeScript files.
                eslintLoader(),
                // Bundle JavaScript, and transform to ES6 using Babel.
                babelLoader(),
                // Bundle CSS stylesheets and process with PostCSS, extract to single CSS file per bundle.
                cssLoader(),
                // Bundle SCSS stylesheets (processed with LibSass & PostCSS), extract to single CSS file per bundle.
                sassLoader(),
                // Bundle image with optimization
                imageLoader(),
                // Bundle fonts
                fontsLoader(),
                // Allowing for inline usage of a SVG as a React component
                svgxLoader(),
                // Bundles files as text
                rawLoader(),
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
