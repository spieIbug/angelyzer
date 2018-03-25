"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var edge_model_1 = require("../model/edge.model");
var EdgeExtractorService = /** @class */ (function () {
    function EdgeExtractorService() {
    }
    EdgeExtractorService.prototype.edgesForImports = function (module) {
        if (module.imports) {
            return module.imports.map(function (anImport) { return (new edge_model_1.Edge({
                data: { source: anImport, target: module.name, faveColor: '#00006F', strength: 10 }
            })); });
        }
        return [];
    };
    EdgeExtractorService.prototype.edgesForExports = function (module) {
        if (module.exports) {
            return module.exports.map(function (anExport) { return (new edge_model_1.Edge({
                data: { source: module.name, target: anExport, faveColor: '#00006F', strength: 10 }
            })); });
        }
        return [];
    };
    EdgeExtractorService.prototype.edgesForBootstrap = function (module) {
        if (module.bootstrap) {
            return module.bootstrap.map(function (bootstrap) { return (new edge_model_1.Edge({
                data: { source: module.name, target: bootstrap, faveColor: '#505050', strength: 10 }
            })); });
        }
        return [];
    };
    EdgeExtractorService.prototype.edgesForDeclarations = function (module) {
        if (module.declarations) {
            return module.declarations.map(function (declaration) { return (new edge_model_1.Edge({
                data: { source: module.name, target: declaration, faveColor: '#FFD90B', strength: 10 }
            })); });
        }
        return [];
    };
    EdgeExtractorService.prototype.edgesForProviders = function (module) {
        if (module.providers) {
            return module.providers.map(function (provider) { return (new edge_model_1.Edge({
                data: { source: module.name, target: provider, faveColor: '#EDA1ED', strength: 10 }
            })); });
        }
        return [];
    };
    return EdgeExtractorService;
}());
exports.EdgeExtractorService = EdgeExtractorService;
