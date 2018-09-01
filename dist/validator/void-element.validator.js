"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rule_enum_1 = require("../model/rule.enum");
var VoidElementValidator = /** @class */ (function () {
    function VoidElementValidator() {
    }
    VoidElementValidator.prototype.validate = function (modules) {
        var validations = [];
        for (var _i = 0, modules_1 = modules; _i < modules_1.length; _i++) {
            var mod = modules_1[_i];
            if (mod.hasVoidElement) {
                validations.push({
                    rule: rule_enum_1.RuleEnum.NO_VOID_ELEMENT_IN_MODULE_DEFINITION.toString(),
                    className: mod.name,
                    error: shouldNotHaveVoidTemplate(mod.name)
                });
            }
        }
        return validations;
    };
    return VoidElementValidator;
}());
exports.VoidElementValidator = VoidElementValidator;
function shouldNotHaveVoidTemplate(moduleName) {
    return "The module " + moduleName + " should not have an empty array of import, export, declaration or provider";
}
