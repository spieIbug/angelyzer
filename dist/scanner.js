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
var logger_1 = require("./logger");
var ast_component_extractor_service_1 = require("./extractor/ast-component-extractor.service");
var component_mapper_1 = require("./mapper/component.mapper");
var uml_js_template_1 = require("./template/uml.js.template");
var class_mapper_1 = require("./mapper/class.mapper");
var fs = require('fs');
var Scanner = /** @class */ (function () {
    function Scanner() {
        this.validations = [];
        this.modules = [];
        this.components = [];
        this.classes = [];
        this.moduleFilesCount = 0;
        this.componentFilesCount = 0;
        this.filesCount = 0;
        this.astModuleExtractorService = new ast_module_extractor_service_1.ASTModuleExtractorService();
        this.astComponentExtractorService = new ast_component_extractor_service_1.ASTComponentExtractorService();
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
        this.componentMapper = new component_mapper_1.ComponentMapper();
        this.classMapper = new class_mapper_1.ClassMapper();
    }
    Scanner.prototype.scanComponents = function (files, componentPath, savePath) {
        var _this = this;
        if (files) {
            files.forEach(function (file) {
                var fullQualifierPath = componentPath + '/' + file;
                if (fs.lstatSync(fullQualifierPath).isFile()) {
                    // scan uniquement de composants
                    if (fullQualifierPath.indexOf('component.ts') !== -1) {
                        _this.processComponentFile(fullQualifierPath);
                    }
                }
                else if (fs.lstatSync(fullQualifierPath).isDirectory()) {
                    fs.readdir(fullQualifierPath, function (err, files) { return _this.scanComponents(files, fullQualifierPath, savePath); });
                }
            });
        }
    };
    Scanner.prototype.scanFiles = function (files, path, savePath, suffix) {
        var _this = this;
        if (files) {
            files.forEach(function (file) {
                var fullQualifierPath = path + '/' + file;
                if (fs.lstatSync(fullQualifierPath).isFile()) {
                    // scan uniquement de composants
                    if (fullQualifierPath.indexOf(suffix) !== -1) {
                        _this.processFile(fullQualifierPath);
                    }
                }
                else if (fs.lstatSync(fullQualifierPath).isDirectory()) {
                    fs.readdir(fullQualifierPath, function (err, files) { return _this.scanFiles(files, fullQualifierPath, savePath, suffix); });
                }
            });
        }
    };
    Scanner.prototype.scanModules = function (files, modulePath, savePath) {
        var _this = this;
        if (files) {
            // todo: refactor this part using filte-type.enum.ts
            files.forEach(function (file) {
                var fullQualifierPath = modulePath + '/' + file;
                if (fs.lstatSync(fullQualifierPath).isFile()) {
                    // scan uniquement de modules
                    if (fullQualifierPath.indexOf('module.ts') !== -1)
                        _this.processModuleFile(fullQualifierPath);
                }
                else if (fs.lstatSync(fullQualifierPath).isDirectory()) {
                    fs.readdir(fullQualifierPath, function (err, files) { return _this.scanModules(files, fullQualifierPath, savePath); });
                }
            });
            // end todo
            var graph = this.graphService.computeGraph(this.modules);
            var importRefactorValidations = this.importRefactorValidator.validate(this.modules);
            var declarationRefactorValidations = this.declarationRefactorValidator.validate(this.modules);
            var providersRefactorValidations = this.providersRefactorValidator.validate(this.modules);
            var voidRefactorValidations = this.voidElementValidator.validate(this.modules);
            fs.writeFileSync(savePath + '/index.html', index_html_template_1.indexTemplate());
            fs.writeFileSync(savePath + '/style.css', style_css_template_1.cssTemplate());
            fs.writeFileSync(savePath + '/uml.js', uml_js_template_1.umlJSTemplate());
            fs.writeFileSync(savePath + '/report.json', JSON.stringify(this.modules, null, 2));
            fs.writeFileSync(savePath + '/components.js', 'var components = ' + JSON.stringify(this.components, null, 2));
            // fs.writeFileSync(savePath + '/classes.js', 'var classes = ' + JSON.stringify(this.classes, null, 2));
            fs.writeFileSync(savePath + '/uml-data.js', 'var umlData = ' + JSON.stringify(this.componentMapper.toGraphs(this.components), null, 2));
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
    /**
     * Scan component.ts file
     * @param inputFile
     */
    Scanner.prototype.processComponentFile = function (inputFile) {
        this.componentFilesCount++;
        var componentFileContent = fs.readFileSync(inputFile, 'utf-8');
        logger_1.Logger.info(this.componentFilesCount + " scanning component file " + inputFile);
        var angularComponent = this.astComponentExtractorService.extractComponent(componentFileContent);
        this.components.push(angularComponent);
    };
    Scanner.prototype.processFile = function (inputFile) {
        this.filesCount++;
        var fileContent = fs.readFileSync(inputFile, 'utf-8');
        logger_1.Logger.info(this.filesCount + " scanning file " + inputFile);
        var clazz = this.astComponentExtractorService.extractClass(fileContent);
        this.classes.push(clazz);
    };
    Scanner.prototype.processModuleFile = function (inputFile) {
        this.moduleFilesCount++;
        var moduleFileContent = fs.readFileSync(inputFile, 'utf-8');
        logger_1.Logger.info(this.moduleFilesCount + " scanning module " + inputFile);
        // read module
        var angularModule = this.astModuleExtractorService.extractModule(moduleFileContent);
        this.modules.push(angularModule);
        //
        var coreSharedModulePatternValidation = this.coreModuleValidation.validate(angularModule, this.astModuleExtractorService.getAST(moduleFileContent));
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
