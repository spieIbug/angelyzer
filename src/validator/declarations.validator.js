"use strict";
exports.__esModule = true;
var validation_model_1 = require("../../dist/model/validation.model");
var element_not_in_wright_place_template_1 = require("../template/element-not-in-wright-place.template");
var rule_enum_1 = require("../model/rule.enum");
/**
 * a validator that checks if you've not thing like :
 * providers: [FooComponent, BarDirective, OtherPipe],
 * exports: [WrongProvider]
 */
var DeclarationsValidator = /** @class */ (function () {
    function DeclarationsValidator() {
    }
    DeclarationsValidator.prototype.validate = function (module, ast) {
        var listOfDeclarationsViolations = [];
        for (var _i = 0, _a = module.declarations; _i < _a.length; _i++) {
            var declaration = _a[_i];
            if (!declaration.match(/.+(Component|Pipe|Directive)$/)) {
                listOfDeclarationsViolations.push(element_not_in_wright_place_template_1.elementNotInWrightPlace(declaration, 'declarations'));
            }
        }
        if (listOfDeclarationsViolations.length > 0) {
            return new validation_model_1.Validation({
                rule: rule_enum_1.RuleEnum.ELEMENT_CAN_NOT_BE_DECLARED.toString(),
                className: module.name,
                error: element_not_in_wright_place_template_1.elementsNotInWrightPlace(listOfDeclarationsViolations)
            });
        }
        return null;
    };
    return DeclarationsValidator;
}());
exports.DeclarationsValidator = DeclarationsValidator;
