"use strict";
exports.__esModule = true;
var validation_model_1 = require("../model/validation.model");
var rule_enum_1 = require("../model/rule.enum");
var ImportRefactorValidator = /** @class */ (function () {
    function ImportRefactorValidator() {
    }
    ImportRefactorValidator.prototype.validate = function (modules) {
        var validations = [];
        var importsMap = this.getModulesImportsMap(modules);
        var keys = Array.from(importsMap.keys());
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var importsSet = importsMap.get(key);
            if (importsSet.size > 1) {
                var parse = JSON.stringify(importsSet);
                var validation = new validation_model_1.Validation({
                    className: key,
                    error: key + " is imported in " + importsSet.size + " modules, " + parse + ". You can move it to SharedModule",
                    rule: rule_enum_1.RuleEnum.MODULE_MULTIPLE_IMPORT_REFACTOR.toString()
                });
                validations.push(validation);
            }
        }
        return validations;
    };
    ImportRefactorValidator.prototype.getModulesImportsMap = function (modules) {
        var importModulesMap = new Map();
        for (var _i = 0, modules_1 = modules; _i < modules_1.length; _i++) {
            var module_1 = modules_1[_i];
            for (var _a = 0, _b = module_1.imports; _a < _b.length; _a++) {
                var anImport = _b[_a];
                var modulesSet = importModulesMap.get(anImport);
                if (modulesSet) {
                    modulesSet.add(module_1.name);
                }
                else {
                    importModulesMap.set(anImport, new Set([module_1.name]));
                }
            }
        }
        return importModulesMap;
    };
    return ImportRefactorValidator;
}());
exports.ImportRefactorValidator = ImportRefactorValidator;
