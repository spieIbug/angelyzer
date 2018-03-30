import { AngularModule } from './model/angular-module.model';
import { GraphExtractorService } from './extractor/graph-extractor.service';
import { ASTModuleExtractorService } from './extractor/ast-module-extractor.service';
import { CoreModuleValidator } from './validator/core-module.validator';
import { graphJSTemplate } from './template/code.js.template';
import { validationTemplate } from './template/validations.html.template';
import { Validation } from './model/validation.model';
import { ElementInWrightPlaceValidator } from './validator/element-in-wright-place.validator';
const fs = require('fs');

export class Scanner {

  private graphService: GraphExtractorService;
  private astModuleExtractorService: ASTModuleExtractorService;
  private coreModuleValidation: CoreModuleValidator;
  private elementNotInWrightPlaceValidator: ElementInWrightPlaceValidator;

  private modules: AngularModule[] = [];
  private fileCount: number = 0;
  private validations: Validation[] = [];

  constructor() {
    this.astModuleExtractorService = new ASTModuleExtractorService();
    this.graphService = new GraphExtractorService();
    this.coreModuleValidation = new CoreModuleValidator();
    this.elementNotInWrightPlaceValidator = new ElementInWrightPlaceValidator();
  }

  public scanPath(files: string[], modulePath: string): void {
    if (files) {
      files.forEach(file => {
        const fullQualifierPath = modulePath + '/' + file;
        if (fs.lstatSync(fullQualifierPath).isFile()) {
          // scan uniquement de modules
          if (fullQualifierPath.indexOf('module.ts') !== -1) this.processFile(fullQualifierPath);
        } else if (fs.lstatSync(fullQualifierPath).isDirectory()) {
          fs.readdir(fullQualifierPath, (err, files) => this.scanPath(files, fullQualifierPath));
        }
      });

      const graph = this.graphService.computeGraph(this.modules);
      fs.writeFileSync('./report/report.json', JSON.stringify(this.modules, null, 2));
      fs.writeFileSync('./report/nodes.json', JSON.stringify(graph, null, 2));
      fs.writeFileSync('./report/validations.html', validationTemplate(this.validations));
      fs.writeFileSync('./report/code.js', graphJSTemplate(graph));
    } else {
      console.log('No files found');
    }
  }

  private processFile(inputFile: string) {
    this.fileCount++;
    const fileContent = fs.readFileSync(inputFile, 'utf-8');
    console.log(this.fileCount, ' scanning file :', inputFile);
    // read module
    const angularModule = <AngularModule> this.astModuleExtractorService.extractModule(fileContent);
    this.modules.push(angularModule);
    //
    const coreSharedModulePatternValidation = this.coreModuleValidation.validate(angularModule, this.astModuleExtractorService.getAST(fileContent));
    const elementsValidation = this.elementNotInWrightPlaceValidator.validate(angularModule);

    if (coreSharedModulePatternValidation) this.validations.push(coreSharedModulePatternValidation);
    if (elementsValidation) this.validations.push(elementsValidation);


  }
}