"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_diagram_model_1 = require("../model/class-diagram.model");
var lodash_1 = require("lodash");
var ComponentMapper = /** @class */ (function () {
    function ComponentMapper() {
    }
    ComponentMapper.prototype.toGraph = function (component) {
        var uml = new class_diagram_model_1.ClassDiagramModel();
        uml.nodes = __spreadArrays([
            new class_diagram_model_1.UMLNode({
                key: component.name,
                name: component.name,
                properties: component.properties,
                inputs: component.inputs,
                outputs: component.outputs,
                methods: component.methods,
            })
        ], lodash_1.map(component.dependencies, function (dep) { return new class_diagram_model_1.UMLNode({ key: dep.type, name: dep.type }); }));
        if (component.extends) {
            uml.nodes.push(new class_diagram_model_1.UMLNode({ key: component.extends, name: component.extends }));
        }
        uml.links = __spreadArrays(lodash_1.map(component.dependencies, function (dep) { return new class_diagram_model_1.UMLLink({ from: component.name, to: dep.type, relationship: 'aggregation' }); }), lodash_1.map(component.implements, function (implem) { return new class_diagram_model_1.UMLLink({ from: component.name, to: implem, relationship: 'generalization' }); }));
        if (component.extends) {
            uml.links.push(new class_diagram_model_1.UMLLink({
                from: component.name,
                to: component.extends,
                relationship: 'generalization',
            }));
        }
        return uml;
    };
    ComponentMapper.prototype.toGraphs = function (components) {
        var _this = this;
        return lodash_1.map(components, function (component) { return _this.toGraph(component); });
    };
    return ComponentMapper;
}());
exports.ComponentMapper = ComponentMapper;
