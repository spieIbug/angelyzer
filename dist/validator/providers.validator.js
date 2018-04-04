"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var element_not_in_wright_place_template_1 = require("../template/element-not-in-wright-place.template");
var rule_enum_1 = require("../model/rule.enum");
var validation_model_1 = require("../model/validation.model");
/**
 * a validator that checks if you've not thing like :
 * providers: [FooComponent, BarDirective, OtherPipe],
 * exports: [WrongProvider]
 */
var ProvidersValidator = /** @class */ (function () {
    function ProvidersValidator() {
    }
    ProvidersValidator.prototype.validate = function (module, ast) {
        var listOfProvidersViolations = [];
        for (var _i = 0, _a = module.providers; _i < _a.length; _i++) {
            var provider = _a[_i];
            if (provider.match(/.+(Component|Pipe|Directive|Module)$/)) {
                listOfProvidersViolations.push(element_not_in_wright_place_template_1.elementNotInWrightPlace(provider, 'providers'));
            }
        }
        if (listOfProvidersViolations.length > 0) {
            return new validation_model_1.Validation({
                rule: rule_enum_1.RuleEnum.ELEMENT_CAN_NOT_BE_PROVIDED.toString(),
                className: module.name,
                error: element_not_in_wright_place_template_1.elementsNotInWrightPlace(listOfProvidersViolations)
            });
        }
        return null;
    };
    return ProvidersValidator;
}());
exports.ProvidersValidator = ProvidersValidator;
