"use strict";
exports.__esModule = true;
var Graph = /** @class */ (function () {
    function Graph(params) {
        this.nodes = [];
        this.edges = [];
        var nodes = params.nodes, edges = params.edges;
        this.nodes = nodes;
        this.edges = edges;
    }
    return Graph;
}());
exports.Graph = Graph;
