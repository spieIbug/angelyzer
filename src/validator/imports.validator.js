"use strict";
exports.__esModule = true;
var validation_model_1 = require("../../dist/model/validation.model");
var rule_enum_1 = require("../model/rule.enum");
var element_not_in_wright_place_template_1 = require("../template/element-not-in-wright-place.template");
var ImportsValidator = /** @class */ (function () {
    function ImportsValidator() {
    }
    ImportsValidator.prototype.validate = function (module, ast) {
        var listOfImportsViolations = [];
        for (var _i = 0, _a = module.imports; _i < _a.length; _i++) {
            var anImport = _a[_i];
            if (!anImport.match(/.+Module$/)) {
                listOfImportsViolations.push(element_not_in_wright_place_template_1.elementNotInWrightPlace(anImport, 'imports'));
            }
        }
        if (listOfImportsViolations.length > 0) {
            return new validation_model_1.Validation({
                rule: rule_enum_1.RuleEnum.IMPORT_NON_MODULE.toString(),
                className: module.name,
                error: element_not_in_wright_place_template_1.elementsNotInWrightPlace(listOfImportsViolations)
            });
        }
        return null;
    };
    return ImportsValidator;
}());
exports.ImportsValidator = ImportsValidator;
