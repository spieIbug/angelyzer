"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
