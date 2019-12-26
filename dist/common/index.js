"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _webpack = require("webpack");

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _production = _interopRequireDefault(require("./production"));

var _development = _interopRequireDefault(require("./development"));

var _types = require("../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(props) {
  var _props$env = props.env,
      env = _props$env === void 0 ? _types.EEnv.DEVELOPMENT : _props$env;
  return (0, _webpackMerge["default"])(env === _types.EEnv.PRODUCTION ? (0, _production["default"])(props) : (0, _development["default"])(props), {
    plugins: [new _webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(env === _types.EEnv.PRODUCTION ? _types.EEnv.PRODUCTION : _types.EEnv.DEVELOPMENT)
    })]
  });
};

exports["default"] = _default;