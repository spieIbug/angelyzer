"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular_module_model_1 = require("../model/angular-module.model");
var recast = require("recast");
var ASTModuleExtractorService = /** @class */ (function () {
    function ASTModuleExtractorService() {
    }
    /**
     * Read an Angular Module fileContent and return AngularModule instance containing Decorator properties
     * @param fileContent
     * @returns {any}
     */
    ASTModuleExtractorService.prototype.extractModule = function (fileContent) {
        var ast = this.getAST(fileContent);
        var nodes = ast.program.body;
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            if (node.type === 'ExportNamedDeclaration' && node.declaration.type === 'ClassDeclaration') {
                var name_1 = this.extractModuleName(node);
                var decorator = this.extractNgModuleDecorator(node);
                var imports = this.extractImports(decorator, nodes);
                var _a = this.extractDeclarations(decorator, nodes), declarations = _a.declarations, hasVoidDeclaration = _a.hasVoidDeclaration;
                var providers = this.extractProviders(decorator, nodes);
                var bootstrap = this.extractBootStrap(decorator);
                var exports_1 = this.extractExports(decorator, nodes);
                return new angular_module_model_1.AngularModule({
                    name: name_1, bootstrap: bootstrap, imports: imports, declarations: declarations, providers: providers, exports: exports_1, hasVoidElement: (hasVoidDeclaration)
                });
            }
        }
        return null;
    };
    /**
     * Extracts Abstract Syntax Tree for typescript
     * @param fileContent
     */
    ASTModuleExtractorService.prototype.getAST = function (fileContent) {
        return recast.parse(fileContent, {
            parser: require("typescript-eslint-parser")
        });
    };
    ASTModuleExtractorService.prototype.extractModuleName = function (node /*ExportNamedDeclaration | ClassDeclaration*/) {
        return node.declaration.id.name;
    };
    ASTModuleExtractorService.prototype.extractNgModuleDecorator = function (node /*ExportNamedDeclaration | ClassDeclaration*/) {
        for (var _i = 0, _a = node.declaration.decorators; _i < _a.length; _i++) {
            var decorator = _a[_i];
            if (decorator.expression.callee.name === 'NgModule') {
                return decorator.expression.arguments[0];
            }
        }
    };
    /**
     * Extracts Imports or Exports from a NgModule decorator.
     *
     * Imports or Exports are simple strings arrays.
     *
     * @param decorator
     * @param programBody
     * @param type
     * @returns {Array}
     */
    ASTModuleExtractorService.prototype.extractImportsExports = function (decorator, programBody, type) {
        if (type === void 0) { type = 'imports'; }
        var result = [];
        for (var _i = 0, _a = decorator.properties; _i < _a.length; _i++) {
            var property = _a[_i];
            if (property.key.name === type) {
                if (property.value.type === 'Identifier') {
                    var values = this.extractVariableValues(programBody, property.value.name);
                    result.push.apply(result, values);
                }
                else {
                    for (var _b = 0, _c = property.value.elements; _b < _c.length; _b++) {
                        var element = _c[_b];
                        switch (element.type) {
                            case 'Identifier': {
                                result.push(element.name);
                                break;
                            }
                            case 'CallExpression': {
                                result.push(element.callee.object.name);
                                break;
                            }
                            case 'SpreadElement': {
                                var values = this.extractVariableValues(programBody, element.argument.name);
                                result.push.apply(result, values);
                                break;
                            }
                            default: {
                                console.log('Can not find ' + type, element.type);
                            }
                        }
                    }
                }
            }
        }
        return result;
    };
    ASTModuleExtractorService.prototype.extractExports = function (decorator, programBody) {
        return this.extractImportsExports(decorator, programBody, 'exports');
    };
    ASTModuleExtractorService.prototype.extractImports = function (ngModuleDecorator, programBody) {
        return this.extractImportsExports(ngModuleDecorator, programBody, 'imports');
    };
    /**
     * Extract providers from NgModule decorator
     * @param decorator
     * @param programBody
     * @returns {Array}
     */
    ASTModuleExtractorService.prototype.extractProviders = function (decorator, programBody) {
        var providers = [];
        for (var _i = 0, _a = decorator.properties; _i < _a.length; _i++) {
            var property = _a[_i];
            if (property.key.name === 'providers') {
                for (var _b = 0, _c = property.value.elements; _b < _c.length; _b++) {
                    var element = _c[_b];
                    switch (element.type) {
                        case 'Identifier': {
                            providers.push(element.name);
                            break;
                        }
                        case 'ObjectExpression': {
                            if (element.properties[1].key.name === 'useValue') {
                                providers.push(element.properties[0].value.name);
                            }
                            if (element.properties[1].key.name === 'useClass') {
                                providers.push(element.properties[1].value.name);
                            }
                            // todo: handle useFactory, useExisting
                            break;
                        }
                        case 'CallExpression': {
                            providers.push(element.callee.object.name);
                            break;
                        }
                        case 'SpreadElement': {
                            var values = this.extractVariableValues(programBody, element.argument.name);
                            providers.push.apply(providers, values);
                            break;
                        }
                        default: {
                            console.log('Providers analyzing, can not find Identifier ', element.type);
                        }
                    }
                }
            }
        }
        return providers;
    };
    /**
     * Extract declarations from NgModule decorator
     * @param decorator
     * @param programBody
     * @returns {Array}
     */
    ASTModuleExtractorService.prototype.extractDeclarations = function (decorator, programBody) {
        var declarations = [];
        var hasVoidDeclaration = false;
        for (var _i = 0, _a = decorator.properties; _i < _a.length; _i++) {
            var property = _a[_i];
            if (property.key.name === 'declarations') {
                if (!property.value.elements) {
                    hasVoidDeclaration = true;
                    continue;
                }
                for (var _b = 0, _c = property.value.elements; _b < _c.length; _b++) {
                    var element = _c[_b];
                    switch (element.type) {
                        case 'Identifier': {
                            declarations.push(element.name);
                            break;
                        }
                        case 'SpreadElement': {
                            var values = this.extractVariableValues(programBody, element.argument.name);
                            declarations.push.apply(declarations, values);
                            break;
                        }
                        default: {
                            console.log('Declarations analyzing, Can not find Identifier ', element.type);
                        }
                    }
                }
            }
        }
        return { declarations: declarations, hasVoidDeclaration: hasVoidDeclaration };
    };
    /**
     * Extract bootstrap properties form NgModule decorator
     * @param decorator
     * @returns {Array}
     */
    ASTModuleExtractorService.prototype.extractBootStrap = function (decorator) {
        var bootstrap = [];
        for (var _i = 0, _a = decorator.properties; _i < _a.length; _i++) {
            var property = _a[_i];
            if (property.key.name === 'bootstrap') {
                for (var _b = 0, _c = property.value.elements; _b < _c.length; _b++) {
                    var element = _c[_b];
                    switch (element.type) {
                        case 'Identifier': {
                            bootstrap.push(element.name);
                            break;
                        }
                        default: {
                            console.log('Bootstrap analyzing, Can not find bootstrap ', element.type);
                        }
                    }
                }
            }
        }
        return bootstrap;
    };
    /**
     * Scan programBody for given varName and return corresponding value
     * @param programBody
     * @param varName
     * @returns {Array}
     */
    ASTModuleExtractorService.prototype.extractVariableValues = function (programBody, varName) {
        var values = [];
        for (var _i = 0, programBody_1 = programBody; _i < programBody_1.length; _i++) {
            var node = programBody_1[_i];
            if (node.type === 'VariableDeclaration') {
                if (node.declarations[0].id && node.declarations[0].id.name === varName) {
                    for (var _a = 0, _b = node.declarations[0].init.elements; _a < _b.length; _a++) {
                        var val = _b[_a];
                        if (val.type === 'ObjectExpression') {
                            if (val.properties[1].key.name === 'useValue') {
                                values.push(val.properties[0].value.name);
                            }
                            if (val.properties[1].key.name === 'useClass') {
                                values.push(val.properties[1].value.name);
                            }
                            // todo: handle useFactory, useExisting
                        }
                        else {
                            values.push(val.name);
                        }
                    }
                    return values;
                }
            }
        }
        return values;
    };
    return ASTModuleExtractorService;
}());
exports.ASTModuleExtractorService = ASTModuleExtractorService;
