export default () => ({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']
})
