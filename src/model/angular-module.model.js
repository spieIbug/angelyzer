"use strict";
exports.__esModule = true;
var AngularModule = /** @class */ (function () {
    function AngularModule(params) {
        var name = params.name, imports = params.imports, exports = params.exports, declarations = params.declarations, bootstrap = params.bootstrap, providers = params.providers;
        this.name = name;
        this.imports = imports;
        this.exports = exports;
        this.declarations = declarations;
        this.bootstrap = bootstrap;
        this.providers = providers;
    }
    return AngularModule;
}());
exports.AngularModule = AngularModule;
