'use strict'

Object.defineProperty(exports, '__esModule', {
    value: true
})
exports['default'] = void 0

var _default = function _default() {
    return {
        test: /\.[jt]sx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'babel-loader'
    }
}

exports['default'] = _default
