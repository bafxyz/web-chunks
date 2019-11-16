"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default() {
  return {
    test: /\.css$/,
    use: ['style-loader', 'css-loader?sourceMap', 'postcss-loader']
  };
};

exports["default"] = _default;