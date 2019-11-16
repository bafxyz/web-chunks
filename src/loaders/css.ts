export default () => ({
    test: /\.css$/,
    use: ['style-loader', 'css-loader?sourceMap', 'postcss-loader']
})
