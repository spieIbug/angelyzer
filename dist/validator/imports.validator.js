"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rule_enum_1 = require("../model/rule.enum");
var element_not_in_right_place_template_1 = require("../template/element-not-in-right-place.template");
var validation_model_1 = require("../model/validation.model");
/**
 * Angular Modules Imports validator
 */
var ImportsValidator = /** @class */ (function () {
    function ImportsValidator() {
    }
    /**
     * validate if the given module does not have other objects thant Modules in imports
     * @param module
     * @param ast
     * @returns {Validation}
     */
    ImportsValidator.prototype.validate = function (module, ast) {
        var listOfImportsViolations = [];
        for (var _i = 0, _a = module.imports; _i < _a.length; _i++) {
            var anImport = _a[_i];
            if (!anImport.match(/.+Module$/)) {
                listOfImportsViolations.push(element_not_in_right_place_template_1.elementNotInRightPlace(anImport, 'imports'));
            }
        }
        if (listOfImportsViolations.length > 0) {
            return new validation_model_1.Validation({
                rule: rule_enum_1.RuleEnum.IMPORT_NON_MODULE.toString(),
                className: module.name,
                error: element_not_in_right_place_template_1.elementsNotInRightPlace(listOfImportsViolations)
            });
        }
        return null;
    };
    return ImportsValidator;
}());
exports.ImportsValidator = ImportsValidator;
