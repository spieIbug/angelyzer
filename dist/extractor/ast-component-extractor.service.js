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
Object.defineProperty(exports, "__esModule", { value: true });
var angular_component_model_1 = require("../model/angular-component.model");
var lodash_1 = require("lodash");
var ast_class_extractor_service_1 = require("./ast-class-extractor.service");
var ASTComponentExtractorService = /** @class */ (function (_super) {
    __extends(ASTComponentExtractorService, _super);
    function ASTComponentExtractorService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ASTComponentExtractorService.prototype.extractComponent = function (fileContent) {
        var _this = this;
        var component = new angular_component_model_1.AngularComponent(this.extractClass(fileContent));
        var ast = this.getAST(fileContent);
        var nodes = ast.program.body;
        lodash_1.forEach(nodes, function (node /*: ExportNamedDeclaration*/) {
            if (node.type === 'ExportNamedDeclaration' && node.declaration.type === 'ClassDeclaration') {
                component.inputs = lodash_1.map(lodash_1.filter(node.declaration.body.body, function (p) { return p.type === 'ClassProperty' && _this.isInput(p); }), function (p) { return new angular_component_model_1.Input({
                    name: p.key.name,
                    type: _this.extractTypeAsString(lodash_1.get(p, 'typeAnnotation.typeAnnotation')),
                }); });
                component.outputs = lodash_1.map(lodash_1.filter(node.declaration.body.body, function (p) { return p.type === 'ClassProperty' && _this.isOutput(p); }), function (p) { return new angular_component_model_1.Input({
                    name: p.key.name,
                    type: _this.extractTypeAsString(lodash_1.get(p, 'typeAnnotation.typeAnnotation')),
                }); });
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
    return ASTComponentExtractorService;
}(ast_class_extractor_service_1.AstClassExtractorService));
exports.ASTComponentExtractorService = ASTComponentExtractorService;
