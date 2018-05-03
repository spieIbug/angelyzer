"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validation_model_1 = require("../model/validation.model");
var rule_enum_1 = require("../model/rule.enum");
/**
 * A simple Providers validator that checks if the same provider is provider more than once.
 */
var ProvidersRefactorValidator = /** @class */ (function () {
    function ProvidersRefactorValidator() {
        this.EXLUSION_MODULES = ['AppModule', 'SharedModule', 'CoreModule'];
    }
    /**
     * validate if the given modules has providers defines more than once.
     * @param modules Angular Modules
     * @returns {Validation[]} Empty Array if no validation Error is detected
     */
    ProvidersRefactorValidator.prototype.validate = function (modules) {
        var validations = [];
        var providersMap = this.getModulesProvidersMap(modules);
        var keys = Array.from(providersMap.keys());
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var modulesSet = providersMap.get(key);
            this.clean(modulesSet, this.EXLUSION_MODULES);
            if (modulesSet.size > 1) {
                this.clean(modulesSet, ['AppModule', 'SharedModule', 'CoreModule']);
                var parse = JSON.stringify(modulesSet, null, 2);
                var validation = new validation_model_1.Validation({
                    className: key,
                    error: key + " is provided in " + modulesSet.size + " modules, <code><pre>" + parse + "</pre></code> This is so bad",
                    rule: rule_enum_1.RuleEnum.PROVIDE_SERVICE_IN_SINGLE_MODULE.toString()
                });
                validations.push(validation);
            }
        }
        return validations;
    };
    /**
     * return a providers modules map for the given angular modules
     * @param modules
     * @returns {Map<string, Set<string>>}
     */
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
    /**
     * remove exclusionModules form modulesSet
     * @param modulesSet
     * @param exclusionModules
     */
    ProvidersRefactorValidator.prototype.clean = function (modulesSet, exclusionModules) {
        if (modulesSet === void 0) { modulesSet = new Set(); }
        for (var _i = 0, exclusionModules_1 = exclusionModules; _i < exclusionModules_1.length; _i++) {
            var value = exclusionModules_1[_i];
            modulesSet.delete(value);
        }
    };
    return ProvidersRefactorValidator;
}());
exports.ProvidersRefactorValidator = ProvidersRefactorValidator;
