"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graph_extractor_service_1 = require("./extractor/graph-extractor.service");
var ast_module_extractor_service_1 = require("./extractor/ast-module-extractor.service");
var core_module_validator_1 = require("./validator/core-module.validator");
var code_js_template_1 = require("./template/code.js.template");
var validations_html_template_1 = require("./template/validations.html.template");
var providers_validator_1 = require("./validator/providers.validator");
var imports_validator_1 = require("./validator/imports.validator");
var exports_validator_1 = require("./validator/exports.validator");
var declarations_validator_1 = require("./validator/declarations.validator");
var import_refactor_validator_1 = require("./validator/import-refactor.validator");
var refactor_html_template_1 = require("./template/refactor.html.template");
var declaration_refactor_validator_1 = require("./validator/declaration-refactor.validator");
var providers_refactor_validator_1 = require("./validator/providers-refactor.validator");
var index_html_template_1 = require("./template/index.html.template");
var style_css_template_1 = require("./template/style.css.template");
var void_element_validator_1 = require("./validator/void-element.validator");
var fs = require('fs');
var Scanner = /** @class */ (function () {
    function Scanner() {
        this.modules = [];
        this.fileCount = 0;
        this.validations = [];
        this.astModuleExtractorService = new ast_module_extractor_service_1.ASTModuleExtractorService();
        this.graphService = new graph_extractor_service_1.GraphExtractorService();
        this.coreModuleValidation = new core_module_validator_1.CoreModuleValidator();
        this.providersValidator = new providers_validator_1.ProvidersValidator();
        this.importsValidator = new imports_validator_1.ImportsValidator();
        this.exportsValidator = new exports_validator_1.ExportsValidator();
        this.declarationsValidator = new declarations_validator_1.DeclarationsValidator();
        this.importRefactorValidator = new import_refactor_validator_1.ImportRefactorValidator();
        this.declarationRefactorValidator = new declaration_refactor_validator_1.DeclarationRefactorValidator();
        this.providersRefactorValidator = new providers_refactor_validator_1.ProvidersRefactorValidator();
        this.voidElementValidator = new void_element_validator_1.VoidElementValidator();
    }
    Scanner.prototype.scanPath = function (files, modulePath, savePath) {
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
                    fs.readdir(fullQualifierPath, function (err, files) { return _this.scanPath(files, fullQualifierPath, savePath); });
                }
            });
            var graph = this.graphService.computeGraph(this.modules);
            var importRefactorValidations = this.importRefactorValidator.validate(this.modules);
            var declarationRefactorValidations = this.declarationRefactorValidator.validate(this.modules);
            var providersRefactorValidations = this.providersRefactorValidator.validate(this.modules);
            var voidRefactorValidations = this.voidElementValidator.validate(this.modules);
            fs.writeFileSync(savePath + '/index.html', index_html_template_1.indexTemplate());
            fs.writeFileSync(savePath + '/style.css', style_css_template_1.cssTemplate());
            fs.writeFileSync(savePath + '/report.json', JSON.stringify(this.modules, null, 2));
            fs.writeFileSync(savePath + '/nodes.json', JSON.stringify(graph, null, 2));
            fs.writeFileSync(savePath + '/validations.html', validations_html_template_1.validationTemplate(this.validations));
            fs.writeFileSync(savePath + '/refactor.html', refactor_html_template_1.refactorTemplate(importRefactorValidations.concat(voidRefactorValidations)));
            fs.writeFileSync(savePath + '/declarations.html', refactor_html_template_1.refactorTemplate(declarationRefactorValidations));
            fs.writeFileSync(savePath + '/providers.html', refactor_html_template_1.refactorTemplate(providersRefactorValidations));
            fs.writeFileSync(savePath + '/code.js', code_js_template_1.graphJSTemplate(graph));
        }
        else {
            console.log('No files found');
        }
    };
    Scanner.prototype.processFile = function (inputFile) {
        this.fileCount++;
        var fileContent = fs.readFileSync(inputFile, 'utf-8');
        console.log(this.fileCount, ' scanning file :', inputFile);
        // read module
        var angularModule = this.astModuleExtractorService.extractModule(fileContent);
        this.modules.push(angularModule);
        //
        var coreSharedModulePatternValidation = this.coreModuleValidation.validate(angularModule, this.astModuleExtractorService.getAST(fileContent));
        var providersValidation = this.providersValidator.validate(angularModule);
        var exportsValidation = this.exportsValidator.validate(angularModule);
        var importsValidation = this.importsValidator.validate(angularModule);
        var declarationsValidation = this.declarationsValidator.validate(angularModule);
        if (coreSharedModulePatternValidation)
            this.validations.push(coreSharedModulePatternValidation);
        if (providersValidation)
            this.validations.push(providersValidation);
        if (exportsValidation)
            this.validations.push(exportsValidation);
        if (importsValidation)
            this.validations.push(importsValidation);
        if (declarationsValidation)
            this.validations.push(declarationsValidation);
    };
    return Scanner;
}());
exports.Scanner = Scanner;
