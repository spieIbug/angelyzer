"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
