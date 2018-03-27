import { AngularModule } from './model/angular-module.model';
import { GraphExtractorService } from './extractor/graph-extractor.service';
import { ASTModuleExtractorService } from './extractor/ast-module-extractor.service';
import { CoreModuleValidator } from './validator/core-module.validator';
import { CODE } from './template/code.js';
import { Validation } from './model/validation.model';
import { VALIDATIONS } from './template/validations.html';

const fs = require('fs');
const recast = require('recast');

export class Scanner {

  private graphService: GraphExtractorService;
  private astModuleExtractorService: ASTModuleExtractorService;
  private coreModuleValidation: CoreModuleValidator;
  public modules: AngularModule[] = [];
  private fileCount: number = 0;
  private validations: Validation[] = [];

  constructor() {
    this.astModuleExtractorService = new ASTModuleExtractorService();
    this.graphService = new GraphExtractorService();
    this.coreModuleValidation = new CoreModuleValidator();
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
      fs.writeFileSync('./report/validations.html', VALIDATIONS(this.validations));
      fs.writeFileSync('./report/code.js', CODE(graph));
    } else {
      console.log('No files found');
    }
  }

  private processFile(inputFile: string) {
    this.fileCount++;
    const fileContent = fs.readFileSync(inputFile, 'utf-8');
    console.log(this.fileCount, ' scanning file :', inputFile);
    const angularModule = <AngularModule> this.astModuleExtractorService.extractModule(fileContent);
    const validation = this.coreModuleValidation.validate(angularModule, this.astModuleExtractorService.getAST(fileContent));
    if (validation) this.validations.push(validation);
    this.modules.push(angularModule);
  }
}