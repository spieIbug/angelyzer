"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validation_model_1 = require("../model/validation.model");
var rule_enum_1 = require("../model/rule.enum");
var DeclarationRefactorValidator = /** @class */ (function () {
    function DeclarationRefactorValidator() {
    }
    DeclarationRefactorValidator.prototype.validate = function (modules) {
        var validations = [];
        var declarationsMap = this.getModulesDeclarationsMap(modules);
        var keys = Array.from(declarationsMap.keys());
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var declarationsSet = declarationsMap.get(key);
            if (declarationsSet.size > 1) {
                var parse = JSON.stringify(declarationsSet);
                var validation = new validation_model_1.Validation({
                    className: key,
                    error: key + " is declared in " + declarationsSet.size + " modules, " + parse + ". This is so bad",
                    rule: rule_enum_1.RuleEnum.COMPONENT_DIRECTIVE_PIPE_IN_SINGLE_MODULE.toString()
                });
                validations.push(validation);
            }
        }
        return validations;
    };
    DeclarationRefactorValidator.prototype.getModulesDeclarationsMap = function (modules) {
        var declarationModulesMap = new Map();
        for (var _i = 0, modules_1 = modules; _i < modules_1.length; _i++) {
            var module_1 = modules_1[_i];
            for (var _a = 0, _b = module_1.declarations; _a < _b.length; _a++) {
                var declaration = _b[_a];
                var modulesSet = declarationModulesMap.get(declaration);
                if (modulesSet) {
                    modulesSet.add(module_1.name);
                }
                else {
                    declarationModulesMap.set(declaration, new Set([module_1.name]));
                }
            }
        }
        return declarationModulesMap;
    };
    return DeclarationRefactorValidator;
}());
exports.DeclarationRefactorValidator = DeclarationRefactorValidator;
