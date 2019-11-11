"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default() {
  return {
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
  };
};

exports["default"] = _default;