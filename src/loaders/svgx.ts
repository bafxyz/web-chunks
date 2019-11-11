export default () => ({
    test: /\.svgx$/,
    use: {
        loader: require.resolve('svg-react-loader'),
        options: {
            attrs: {
                width: '1em',
                height: '1em'
            }
        }
    }
})
