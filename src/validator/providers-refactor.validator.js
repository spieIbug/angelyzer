"use strict";
exports.__esModule = true;
var validation_model_1 = require("../model/validation.model");
var rule_enum_1 = require("../model/rule.enum");
var ProvidersRefactorValidator = /** @class */ (function () {
    function ProvidersRefactorValidator() {
    }
    ProvidersRefactorValidator.prototype.validate = function (modules) {
        var validations = [];
        var providersMap = this.getModulesProvidersMap(modules);
        var keys = Array.from(providersMap.keys());
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var providersSet = providersMap.get(key);
            this.clean(providersSet, ['AppModule', 'SharedModule', 'CoreModule']);
            if (providersSet.size > 1) {
                this.clean(providersSet, ['AppModule', 'SharedModule', 'CoreModule']);
                var parse = JSON.stringify(providersSet);
                var validation = new validation_model_1.Validation({
                    className: key,
                    error: key + " is provided in " + providersSet.size + " modules, " + parse + ". This is so bad",
                    rule: rule_enum_1.RuleEnum.PROVIDE_SERVICE_IN_SINGLE_MODULE.toString()
                });
                validations.push(validation);
            }
        }
        return validations;
    };
    ProvidersRefactorValidator.prototype.getModulesProvidersMap = function (modules) {
        var providerModulesMap = new Map();
        for (var _i = 0, modules_1 = modules; _i < modules_1.length; _i++) {
            var module_1 = modules_1[_i];
            for (var _a = 0, _b = module_1.providers; _a < _b.length; _a++) {
                var provider = _b[_a];
                var modulesSet = providerModulesMap.get(provider);
                if (modulesSet) {
                    modulesSet.add(module_1.name);
                }
                else {
                    providerModulesMap.set(provider, new Set([module_1.name]));
                }
            }
        }
        return providerModulesMap;
    };
    ProvidersRefactorValidator.prototype.clean = function (aSet, values) {
        if (aSet === void 0) { aSet = new Set(); }
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            aSet["delete"](value);
        }
    };
    return ProvidersRefactorValidator;
}());
exports.ProvidersRefactorValidator = ProvidersRefactorValidator;
