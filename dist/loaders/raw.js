"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default() {
  return {
    test: /\.raw\.[a-zA-Z]*$/,
    use: {
      loader: require.resolve('raw-loader')
    }
  };
};

exports["default"] = _default;