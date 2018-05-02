"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            var modules_1 = this.removeRoutingModulesForRouterModule(importsSet, key);
            if (modules_1.length > 1) {
                var parse = JSON.stringify(modules_1, null, 2);
                var validation = new validation_model_1.Validation({
                    className: key,
                    error: key + " is imported in " + importsSet.size + " modules,<br/> " + parse + ".<br/>You can move it to SharedModule",
                    rule: rule_enum_1.RuleEnum.MODULE_MULTIPLE_IMPORT_REFACTOR.toString()
                });
                validations.push(validation);
            }
        }
        return validations;
    };
    ImportRefactorValidator.prototype.getModulesImportsMap = function (modules) {
        var importModulesMap = new Map();
        for (var _i = 0, modules_2 = modules; _i < modules_2.length; _i++) {
            var module_1 = modules_2[_i];
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
    /**
     * Excluse RoutingModule for RouterModule check if any other module import RouterModule it will be signaled
     * to be refactored
     * @param aSet
     * @param moduleName
     * @returns {string[]} modules
     */
    ImportRefactorValidator.prototype.removeRoutingModulesForRouterModule = function (aSet, moduleName) {
        if (aSet === void 0) { aSet = new Set(); }
        if (moduleName === void 0) { moduleName = 'RouterModule'; }
        var values = aSet.toJSON();
        if (moduleName === 'RouterModule') {
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var value = values_1[_i];
                var routingModules = value.match(/^.+RoutingModule$/gi);
                if (routingModules) {
                    values = values.splice(values.indexOf(routingModules[0]), 1);
                }
            }
        }
        return values;
    };
    return ImportRefactorValidator;
}());
exports.ImportRefactorValidator = ImportRefactorValidator;
