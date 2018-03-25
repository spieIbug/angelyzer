"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var edge_extractor_service_1 = require("./edge-extractor.service");
var node_extractor_service_1 = require("./node-extractor.service");
var graph_model_1 = require("../model/graph.model");
var GraphExtractorService = /** @class */ (function () {
    function GraphExtractorService() {
        this.nodesService = new node_extractor_service_1.NodeExtractorService();
        this.edgesService = new edge_extractor_service_1.EdgeExtractorService();
    }
    GraphExtractorService.prototype.computeGraph = function (modules) {
        var nodes = [];
        var edges = [];
        for (var _i = 0, modules_1 = modules; _i < modules_1.length; _i++) {
            var module_1 = modules_1[_i];
            nodes.push(this.nodesService.moduleToNode(module_1));
            // todo: code plus avec elegance
            nodes.push.apply(nodes, this.nodesService.importsToNodes(module_1));
            edges.push.apply(edges, this.edgesService.edgesForImports(module_1));
            nodes.push.apply(nodes, this.nodesService.exportsToNodes(module_1));
            edges.push.apply(edges, this.edgesService.edgesForExports(module_1));
            nodes.push.apply(nodes, this.nodesService.bootstrapToNodes(module_1));
            edges.push.apply(edges, this.edgesService.edgesForBootstrap(module_1));
            nodes.push.apply(nodes, this.nodesService.declarationsToNodes(module_1));
            edges.push.apply(edges, this.edgesService.edgesForDeclarations(module_1));
            nodes.push.apply(nodes, this.nodesService.providersToNodes(module_1));
            edges.push.apply(edges, this.edgesService.edgesForProviders(module_1));
        }
        // remove duplicates
        var nodeArray = new Set(nodes);
        var edgesArray = new Set(edges);
        return new graph_model_1.Graph({
            edges: Array.from(edgesArray.values()),
            nodes: Array.from(nodeArray.values())
        });
    };
    return GraphExtractorService;
}());
exports.GraphExtractorService = GraphExtractorService;
