"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable
var chalk_1 = require("chalk");
var lodash_1 = require("lodash");
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.info = function (message) {
        var datas = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            datas[_i - 1] = arguments[_i];
        }
        var currentTime = new Date();
        console.log(chalk_1.bgBlack.green("[INFO] " + currentTime.toISOString() + " " + message));
        if (datas.length) {
            lodash_1.forEach(datas, function (data) {
                console.table(data);
            });
        }
    };
    Logger.success = function (message) {
        var datas = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            datas[_i - 1] = arguments[_i];
        }
        console.log(chalk_1.bgGreenBright.black('[SUCCESS] ' + message));
        if (datas.length) {
            lodash_1.forEach(datas, function (data) {
                console.table(data);
            });
        }
    };
    Logger.error = function (message) {
        var datas = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            datas[_i - 1] = arguments[_i];
        }
        console.log(chalk_1.bgRedBright.black('[ERROR] ' + message));
        if (datas.length) {
            lodash_1.forEach(datas, function (data) {
                console.table(data);
            });
        }
    };
    Logger.warning = function (message) {
        var datas = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            datas[_i - 1] = arguments[_i];
        }
        console.log(chalk_1.bgYellowBright.black('[WARNING] ' + message));
        if (datas.length) {
            lodash_1.forEach(datas, function (data) {
                console.table(data);
            });
        }
    };
    return Logger;
}());
exports.Logger = Logger;
