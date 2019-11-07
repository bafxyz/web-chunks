const { appSrc } = require('../paths')

module.exports = () => ({ test: /\.[jt]sx?$/, loader: 'babel-loader', exclude: /node_modules/, include: appSrc })
