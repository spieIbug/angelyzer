"use strict";
exports.__esModule = true;
var Edge = /** @class */ (function () {
    function Edge(params) {
        var _a = params.data, source = _a.source, target = _a.target, faveColor = _a.faveColor, strength = _a.strength;
        this.data = { source: null, target: null, faveColor: null, strength: null };
        this.data.source = source;
        this.data.target = target;
        this.data.faveColor = faveColor;
        this.data.strength = strength;
    }
    return Edge;
}());
exports.Edge = Edge;
