import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default () => ({
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap', 'postcss-loader']
})
