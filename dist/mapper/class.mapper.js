"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var ClassMapper = /** @class */ (function () {
    function ClassMapper() {
    }
    ClassMapper.prototype.toGraph = function (clazz, classes) {
        var uml = new class_diagram_model_1.ClassDiagramModel();
        uml.nodes = __spreadArrays([
            new class_diagram_model_1.UMLNode({
                key: clazz.name,
                name: clazz.name,
                properties: clazz.properties,
                methods: clazz.methods,
            })
        ], lodash_1.map(clazz.dependencies, function (dep) {
            var _a;
            var cl = classes[dep.type];
            if (cl) {
                return new class_diagram_model_1.UMLNode(__assign(__assign({}, cl), { key: (_a = cl) === null || _a === void 0 ? void 0 : _a.name }));
            }
            new class_diagram_model_1.UMLNode({ key: dep.type, name: dep.type });
        }).filter(function (v) { return !!v; }));
        if (clazz.extends) {
            uml.nodes.push(new class_diagram_model_1.UMLNode({ key: clazz.extends, name: clazz.extends }));
        }
        uml.links = __spreadArrays(lodash_1.map(clazz.dependencies, function (dep) { return new class_diagram_model_1.UMLLink({ from: clazz.name, to: dep.type, relationship: 'aggregation' }); }), lodash_1.map(clazz.implements, function (implem) { return new class_diagram_model_1.UMLLink({ from: clazz.name, to: implem, relationship: 'generalization' }); }));
        if (clazz.extends) {
            uml.links.push(new class_diagram_model_1.UMLLink({
                from: clazz.name,
                to: clazz.extends,
                relationship: 'generalization',
            }));
        }
        return uml;
    };
    ClassMapper.prototype.toGraphs = function (classes) {
        var _this = this;
        var classesMap = lodash_1.keyBy(classes, 'name');
        return lodash_1.map(classes, function (clazz) { return _this.toGraph(clazz, classesMap); });
    };
    return ClassMapper;
}());
exports.ClassMapper = ClassMapper;
