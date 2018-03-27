"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graph_extractor_service_1 = require("./extractor/graph-extractor.service");
var ast_module_extractor_service_1 = require("./extractor/ast-module-extractor.service");
var core_module_validator_1 = require("./validator/core-module.validator");
var code_js_1 = require("./template/code.js");
var validations_html_1 = require("./template/validations.html");
var fs = require('fs');
var recast = require('recast');
var Scanner = /** @class */ (function () {
    function Scanner() {
        this.modules = [];
        this.fileCount = 0;
        this.validations = [];
        this.astModuleExtractorService = new ast_module_extractor_service_1.ASTModuleExtractorService();
        this.graphService = new graph_extractor_service_1.GraphExtractorService();
        this.coreModuleValidation = new core_module_validator_1.CoreModuleValidator();
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
            var graph = this.graphService.computeGraph(this.modules);
            fs.writeFileSync('./report/report.json', JSON.stringify(this.modules, null, 2));
            fs.writeFileSync('./report/nodes.json', JSON.stringify(graph, null, 2));
            fs.writeFileSync('./report/validations.html', validations_html_1.VALIDATIONS(this.validations));
            fs.writeFileSync('./report/code.js', code_js_1.CODE(graph));
        }
        else {
            console.log('No files found');
        }
    };
    Scanner.prototype.processFile = function (inputFile) {
        this.fileCount++;
        var fileContent = fs.readFileSync(inputFile, 'utf-8');
        console.log(this.fileCount, ' scanning file :', inputFile);
        var angularModule = this.astModuleExtractorService.extractModule(fileContent);
        var validation = this.coreModuleValidation.validate(angularModule, this.astModuleExtractorService.getAST(fileContent));
        if (validation)
            this.validations.push(validation);
        this.modules.push(angularModule);
    };
    return Scanner;
}());
exports.Scanner = Scanner;
