"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default() {
  return {
    test: /\.(png|jpe?g|eot|gif|woff2?|svg|ttf)$/,
    use: ['url-loader?limit=8192']
  };
};

exports["default"] = _default;