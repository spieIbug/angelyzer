"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rule_enum_1 = require("../model/rule.enum");
var element_not_in_wright_place_template_1 = require("../template/element-not-in-wright-place.template");
var validation_model_1 = require("../model/validation.model");
var ExportsValidator = /** @class */ (function () {
    function ExportsValidator() {
    }
    ExportsValidator.prototype.validate = function (module, ast) {
        var listOfExportsViolations = [];
        for (var _i = 0, _a = module.exports; _i < _a.length; _i++) {
            var anExport = _a[_i];
            if (!anExport.match(/.+(Component|Pipe|Directive|Module)$/)) {
                listOfExportsViolations.push(element_not_in_wright_place_template_1.elementNotInWrightPlace(anExport, 'exports'));
            }
        }
        if (listOfExportsViolations.length > 0) {
            return new validation_model_1.Validation({
                rule: rule_enum_1.RuleEnum.EXPORT_MEMBERS.toString(),
                className: module.name,
                error: element_not_in_wright_place_template_1.elementsNotInWrightPlace(listOfExportsViolations)
            });
        }
        return null;
    };
    return ExportsValidator;
}());
exports.ExportsValidator = ExportsValidator;
