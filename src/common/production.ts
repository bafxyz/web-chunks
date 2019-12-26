import TerserPlugin from 'terser-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { paths } from '../paths'

import { IProps } from '../types'

export default (props: IProps) => ({
    // Set common production options. <goo.gl/nYfBtH>
    mode: 'production',
    // Enable source maps for production (in a separate file, so they
    // will only load if the user has dev tools open).
    devtool: 'source-map',
    // Splits code to multiple chunks
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: 25,
            minSize: 20000,
            maxSize: 200000
        },
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    safari10: true
                }
            })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.indexHtml,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        })
    ]
})
