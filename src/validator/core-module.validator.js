"use strict";
exports.__esModule = true;
var validation_model_1 = require("../model/validation.model");
var for_root_template_1 = require("../template/for-root.template");
var rule_enum_1 = require("../model/rule.enum");
/**
 * Validator that check if you have defined exports, and providers in same module without forRoot method
 */
var CoreModuleValidator = /** @class */ (function () {
    function CoreModuleValidator() {
    }
    /**
     * Validate the given AngularModule and browse AST if the given has providers, and exports
     * @param {AngularModule} module
     * @param ast
     * @returns {Validation} error if CoreModule/SharedModule angular pattern is not accepted
     */
    CoreModuleValidator.prototype.validate = function (module, ast) {
        if (module.providers.length > 0 && module.exports.length > 0) {
            var nodes = ast.program.body;
            for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                var node = nodes_1[_i];
                if (node.type === 'ExportNamedDeclaration' && node.declaration.type === 'ClassDeclaration') {
                    for (var _a = 0, _b = node.declaration.body; _a < _b.length; _a++) {
                        var element = _b[_a];
                        if (element.type === 'MethodDefinition' && element.static) {
                            if (element.key.name === 'forRoot') {
                                return null;
                            }
                        }
                    }
                    return new validation_model_1.Validation({
                        rule: rule_enum_1.RuleEnum.CORE_MODULE_SHARED_MODULE_PATTERN.toString(),
                        className: module.name,
                        error: for_root_template_1.forRootRecommandationTemplate(module)
                    });
                }
            }
        }
        return null;
    };
    return CoreModuleValidator;
}());
exports.CoreModuleValidator = CoreModuleValidator;
