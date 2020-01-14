"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var angular_component_model_1 = require("../model/angular-component.model");
var lodash_1 = require("lodash");
var ast_extractor_service_1 = require("./ast-extractor.service");
var ASTComponentExtractorService = /** @class */ (function (_super) {
    __extends(ASTComponentExtractorService, _super);
    function ASTComponentExtractorService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ASTComponentExtractorService.prototype.extractComponent = function (fileContent) {
        var _this = this;
        var ast = this.getAST(fileContent);
        var nodes = ast.program.body;
        var component = new angular_component_model_1.AngularComponent();
        lodash_1.forEach(nodes, function (node /*: ExportNamedDeclaration*/) {
            if (node.type === 'ExportNamedDeclaration' && node.declaration.type === 'ClassDeclaration') {
                component.name = node.declaration.id.name;
                component.implements = lodash_1.map(node.declaration.implements, function (implem) { return implem.expression.name; });
                component.extends = lodash_1.get(node.declaration, 'superClass.name');
                component.properties = lodash_1.map(lodash_1.filter(node.declaration.body.body, function (p) { return p.type === 'ClassProperty' && !_this.isInput(p) && !_this.isOutput(p); }), function (p) { return new angular_component_model_1.Property({
                    name: p.key.name,
                    visibility: p.accessibility || 'public',
                    type: _this.extractTypeAsString(lodash_1.get(p, 'typeAnnotation.typeAnnotation')),
                }); });
                component.inputs = lodash_1.map(lodash_1.filter(node.declaration.body.body, function (p) { return p.type === 'ClassProperty' && _this.isInput(p); }), function (p) { return new angular_component_model_1.Input({
                    name: p.key.name,
                    type: _this.extractTypeAsString(lodash_1.get(p, 'typeAnnotation.typeAnnotation')),
                }); });
                component.outputs = lodash_1.map(lodash_1.filter(node.declaration.body.body, function (p) { return p.type === 'ClassProperty' && _this.isOutput(p); }), function (p) { return new angular_component_model_1.Input({
                    name: p.key.name,
                    type: _this.extractTypeAsString(lodash_1.get(p, 'typeAnnotation.typeAnnotation')),
                }); });
                component.methods = lodash_1.map(lodash_1.filter(node.declaration.body.body, function (m) { return m.type === 'ClassMethod' && m.key.name !== 'constructor'; }), function (m) { return _this.extractMethodDefinition(m); });
                var constructorBlock = lodash_1.find(node.declaration.body.body, function (m) { return m.type === 'ClassMethod' && m.key.name === 'constructor'; });
                component.dependencies = _this.extractDependencies(constructorBlock);
            }
        });
        return component;
    };
    ASTComponentExtractorService.prototype.isInput = function (p /*ClassProperty*/) {
        if (!p.decorators) {
            return false;
        }
        return p.decorators.map(function (d) { return d.callee.callee.name; }).includes('Input');
    };
    ASTComponentExtractorService.prototype.isOutput = function (p /*ClassProperty*/) {
        if (!p.decorators) {
            return false;
        }
        return p.decorators.map(function (d) { return d.callee.callee.name; }).includes('Output');
    };
    ASTComponentExtractorService.prototype.extractDependencies = function (constructorMethod /*ClassBody body[]*/) {
        var dependancies = lodash_1.get(constructorMethod, 'params', []);
        return dependancies.map(function (dep) {
            return new angular_component_model_1.Dependency({
                name: lodash_1.get(dep, 'parameter.name', dep.name),
                type: lodash_1.get(dep, 'parameter.typeAnnotation.typeAnnotation.typeName.name', lodash_1.get(dep, 'typeAnnotation.typeAnnotation.typeName.name'), 'any'),
                visibility: lodash_1.get(dep, 'accessibility', 'public'),
            });
        });
    };
    ASTComponentExtractorService.prototype.extractMethodDefinition = function (method /*ClassBody body[]*/) {
        var _this = this;
        return new angular_component_model_1.Method({
            name: method.key.name,
            visibility: method.accessibility || 'public',
            parameters: lodash_1.map(lodash_1.get(method, 'params', []), function (param) { return _this.getParamValue(param); }),
            static: !!method.static,
            returns: this.extractTypeAsString(lodash_1.get(method, 'returnType.typeAnnotation')),
        });
    };
    ASTComponentExtractorService.prototype.extractTypeAsString = function (paramType /*TSTypeReference*/) {
        var _this = this;
        var typeParams = lodash_1.get(paramType, 'typeParameters.params', []);
        if (typeParams.length === 0) {
            return lodash_1.get(paramType, 'typeName.name');
        }
        else {
            var types = lodash_1.flattenDeep(__spreadArrays([lodash_1.get(paramType, 'typeName.name')], typeParams.map(function (subType) { return _this.extractTypeAsString(subType); })));
            return types.join('<') + new Array(types.length - 1).fill(undefined).map(function () { return '>'; }).join('');
        }
    };
    ASTComponentExtractorService.prototype.getParamValue = function (param /*Param*/) {
        if (param.type === 'AssignmentPattern') {
            return new angular_component_model_1.Param({
                name: lodash_1.get(param, 'left.name', param.name),
                type: lodash_1.get(param, 'typeAnnotation.typeAnnotation.typeName.name', 'any'),
                value: lodash_1.get(param, 'right.property.name', param.right.name),
                visibility: lodash_1.get(param, 'accessibility', 'public'),
            });
        }
        return new angular_component_model_1.Param({
            name: lodash_1.get(param, 'parameter.name', param.name),
            type: lodash_1.get(param, 'parameter.typeAnnotation.typeAnnotation.typeName.name', lodash_1.get(param, 'typeAnnotation.typeAnnotation.typeName.name'), 'any'),
            value: undefined,
            visibility: lodash_1.get(param, 'accessibility', 'public'),
        });
    };
    return ASTComponentExtractorService;
}(ast_extractor_service_1.AstExtractorService));
exports.ASTComponentExtractorService = ASTComponentExtractorService;
