"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AngularModule = /** @class */ (function () {
    function AngularModule(params) {
        var name = params.name, imports = params.imports, exports = params.exports, declarations = params.declarations, bootstrap = params.bootstrap, providers = params.providers, hasVoidElement = params.hasVoidElement;
        this.name = name;
        this.imports = imports;
        this.exports = exports;
        this.declarations = declarations;
        this.bootstrap = bootstrap;
        this.providers = providers;
        this.hasVoidElement = hasVoidElement;
    }
    return AngularModule;
}());
exports.AngularModule = AngularModule;
