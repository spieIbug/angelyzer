"use strict";
exports.__esModule = true;
var Validation = /** @class */ (function () {
    function Validation(params) {
        var rule = params.rule, className = params.className, error = params.error;
        this.rule = rule;
        this.className = className;
        this.error = error;
    }
    return Validation;
}());
exports.Validation = Validation;
