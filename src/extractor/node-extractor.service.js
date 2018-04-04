"use strict";
exports.__esModule = true;
var node_model_1 = require("../model/node.model");
var NodeExtractorService = /** @class */ (function () {
    function NodeExtractorService() {
    }
    NodeExtractorService.prototype.importsToNodes = function (module) {
        if (module.imports) {
            return module.imports.map(function (anImport) { return (new node_model_1.Node({
                data: {
                    id: anImport,
                    name: anImport,
                    faveColor: '#F5A45D',
                    faveShape: 'rectangle'
                }
            })); });
        }
        return [];
    };
    NodeExtractorService.prototype.exportsToNodes = function (module) {
        if (module.exports) {
            return module.exports.map(function (anExport) {
                if (anExport.indexOf('Module') !== -1) {
                    return new node_model_1.Node({
                        data: {
                            id: anExport,
                            name: anExport,
                            faveColor: '#F5A45D',
                            faveShape: 'rectangle'
                        }
                    });
                }
                return new node_model_1.Node({
                    data: {
                        id: anExport,
                        name: anExport,
                        faveColor: '#0df500',
                        faveShape: 'rectangle'
                    }
                });
            });
        }
        return [];
    };
    NodeExtractorService.prototype.moduleToNode = function (module) {
        var node = new node_model_1.Node({ data: { id: module.name, name: module.name, faveColor: '#F5A45D', faveShape: 'rectangle' } });
        return node;
    };
    NodeExtractorService.prototype.bootstrapToNodes = function (module) {
        if (module.bootstrap) {
            return module.bootstrap.map(function (bootstrap) { return (new node_model_1.Node({
                data: { id: bootstrap, name: bootstrap, faveColor: '#00006F', faveShape: 'triangle' }
            })); });
        }
        return [];
    };
    NodeExtractorService.prototype.declarationsToNodes = function (module) {
        if (module.declarations) {
            return module.declarations.map(function (declaration) { return (new node_model_1.Node({
                data: { id: declaration, name: declaration, faveColor: '#2a586f', faveShape: 'triangle' }
            })); });
        }
        return [];
    };
    NodeExtractorService.prototype.providersToNodes = function (module) {
        if (module.providers) {
            return module.providers.map(function (declaration) { return (new node_model_1.Node({
                data: { id: declaration, name: declaration, faveColor: '#EDA1ED', faveShape: 'ellipse' }
            })); });
        }
        return [];
    };
    return NodeExtractorService;
}());
exports.NodeExtractorService = NodeExtractorService;
