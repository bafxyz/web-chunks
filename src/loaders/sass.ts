import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default () => ({
    test: /\.scss$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']
})
