"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graph_extractor_service_1 = require("./extractor/graph-extractor.service");
var ast_module_extractor_service_1 = require("./extractor/ast-module-extractor.service");
var code_1 = require("./model/code");
var fs = require('fs');
var recast = require("recast");
var Scanner = /** @class */ (function () {
    function Scanner() {
        this.modules = [];
        this.fileCount = 0;
        this.astModuleExtractorService = new ast_module_extractor_service_1.ASTModuleExtractorService();
        this.graphService = new graph_extractor_service_1.GraphExtractorService();
    }
    Scanner.prototype.scanPath = function (files, modulePath) {
        var _this = this;
        if (files) {
            files.forEach(function (file) {
                var fullQualifierPath = modulePath + '/' + file;
                if (fs.lstatSync(fullQualifierPath).isFile()) {
                    // scan uniquement de modules
                    if (fullQualifierPath.indexOf('module.ts') !== -1)
                        _this.processFile(fullQualifierPath);
                }
                else if (fs.lstatSync(fullQualifierPath).isDirectory()) {
                    fs.readdir(fullQualifierPath, function (err, files) { return _this.scanPath(files, fullQualifierPath); });
                }
            });
            fs.writeFileSync("./report/report.json", JSON.stringify(this.modules, null, 2));
            var graph = this.graphService.computeGraph(this.modules);
            fs.writeFileSync("./report/nodes.json", JSON.stringify(graph, null, 2));
            fs.writeFileSync("./report/code.js", code_1.CODE(graph));
        }
        else {
            console.log('No files found');
        }
    };
    Scanner.prototype.processFile = function (inputFile) {
        this.fileCount++;
        var fileContent = fs.readFileSync(inputFile, 'utf-8');
        console.log(this.fileCount, ' scan du fichier :', inputFile);
        var angularModule = this.astModuleExtractorService.extractModule(fileContent);
        this.modules.push(angularModule);
    };
    return Scanner;
}());
exports.Scanner = Scanner;
