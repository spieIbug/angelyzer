"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var recast = require("recast");
var AstExtractorService = /** @class */ (function () {
    function AstExtractorService() {
    }
    /**
     * Extracts Abstract Syntax Tree for typescript
     * @param fileContent
     */
    AstExtractorService.prototype.getAST = function (fileContent) {
        return recast.parse(fileContent, {
            parser: require("recast/parsers/typescript"),
        });
    };
    return AstExtractorService;
}());
exports.AstExtractorService = AstExtractorService;
