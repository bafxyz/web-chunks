"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EEnv = exports.EMode = void 0;
var EMode;
exports.EMode = EMode;

(function (EMode) {
  EMode["CLIENT"] = "client";
  EMode["SERVER"] = "server";
})(EMode || (exports.EMode = EMode = {}));

var EEnv;
exports.EEnv = EEnv;

(function (EEnv) {
  EEnv["PRODUCTION"] = "production";
  EEnv["DEVELOPMENT"] = "development";
})(EEnv || (exports.EEnv = EEnv = {}));