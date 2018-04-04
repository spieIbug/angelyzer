"use strict";
exports.__esModule = true;
var Node = /** @class */ (function () {
    function Node(params) {
        var _a = params.data, id = _a.id, name = _a.name, faveColor = _a.faveColor, faveShape = _a.faveShape;
        this.data = { id: null, name: null, faveColor: null, faveShape: null };
        this.data.id = id;
        this.data.name = name;
        this.data.faveColor = faveColor;
        this.data.faveShape = faveShape;
    }
    return Node;
}());
exports.Node = Node;
