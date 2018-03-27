"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validation_model_1 = require("../model/validation.model");
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
                        rule: 'CoreModule/SharedModule',
                        className: module.name,
                        error: "<p>The module " + module.name + " has exports " + JSON.stringify(module.exports) + " and providers " + JSON.stringify(module.providers) + "</p>\n            <p>You should have a :</p>\n            <code>\n            static forRoot(): ModuleWithProviders {\n              return {\n                ngModule: " + module.name + ",\n                providers: " + JSON.stringify(module.providers) + "\n              };\n            }\n            </code>\n            <p>Or define a CoreModule that only provide " + JSON.stringify(module.providers) + "</p>\n            \n            <p>Becarefull : the forRoot is for AppModule not children.</p>\n           \n            <a href=\"https://angular.io/guide/singleton-services\">@see</a> & <a href=\"https://angular.io/guide/ngmodule-faq#why-is-it-bad-if-a-shared-module-provides-a-service-to-a-lazy-loaded-module\">@see</a>\n            "
                    });
                }
            }
        }
        return null;
    };
    return CoreModuleValidator;
}());
exports.CoreModuleValidator = CoreModuleValidator;
