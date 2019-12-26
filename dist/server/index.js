"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _webpackNodeExternals = _interopRequireDefault(require("webpack-node-externals"));

var _eslint = _interopRequireDefault(require("../loaders/eslint"));

var _babel = _interopRequireDefault(require("../loaders/babel"));

var _mjs = _interopRequireDefault(require("../loaders/mjs"));

var _sourceMap = _interopRequireDefault(require("../loaders/source-map"));

var _paths = require("../paths");

var _types = require("../types");

var _production = _interopRequireDefault(require("./production"));

var _development = _interopRequireDefault(require("./development"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(props) {
  var _props$env = props.env,
      env = _props$env === void 0 ? _types.EEnv.DEVELOPMENT : _props$env;
  return (0, _webpackMerge["default"])(env === _types.EEnv.PRODUCTION ? (0, _production["default"])(props) : (0, _development["default"])(props), {
    entry: "".concat(_paths.paths.src, "/index.ts"),
    target: 'node',
    externals: [(0, _webpackNodeExternals["default"])()],
    // Need this to avoid error when working with Express
    output: {
      filename: 'index.js',
      path: _paths.paths.dist
    },
    module: {
      rules: [// Lint JavaScript/TypeScript files.
      (0, _eslint["default"])(), // Bundle JavaScript, and transform to ES6 using Babel.
      (0, _babel["default"])(), // Mjs type handler
      (0, _mjs["default"])(), // Creates source maps.
      (0, _sourceMap["default"])()]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        '~': _paths.paths.src,
        '@': _paths.paths.nodeModules,
        'react-dom': '@hot-loader/react-dom'
      }
    }
  });
};

exports["default"] = _default;