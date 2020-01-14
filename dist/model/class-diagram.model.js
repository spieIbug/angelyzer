"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClassDiagramModel = /** @class */ (function () {
    function ClassDiagramModel() {
        this.nodes = [];
        this.links = [];
    }
    return ClassDiagramModel;
}());
exports.ClassDiagramModel = ClassDiagramModel;
var UMLNode = /** @class */ (function () {
    function UMLNode(node) {
        Object.assign(this, node);
    }
    return UMLNode;
}());
exports.UMLNode = UMLNode;
var UMLLink = /** @class */ (function () {
    function UMLLink(link) {
        Object.assign(this, link);
    }
    return UMLLink;
}());
exports.UMLLink = UMLLink;
