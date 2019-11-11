"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default() {
  return {
    test: /\.css$/,
    use: [_miniCssExtractPlugin["default"].loader, 'css-loader?sourceMap', 'postcss-loader']
  };
};

exports["default"] = _default;