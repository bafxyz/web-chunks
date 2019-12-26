"use strict";

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _common = _interopRequireDefault(require("./common"));

var _client = _interopRequireDefault(require("./client"));

var _server = _interopRequireDefault(require("./server"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var config = function config(props) {
  var _props$mode = props.mode,
      mode = _props$mode === void 0 ? _types.EMode.CLIENT : _props$mode;
  return (0, _webpackMerge["default"])((0, _common["default"])(props), mode === _types.EMode.SERVER ? (0, _server["default"])(props) : (0, _client["default"])(props), props.options);
};

module.exports = config;