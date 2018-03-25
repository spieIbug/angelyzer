import {AngularModule} from "./model/angular-module.model";
import {GraphExtractorService} from "./extractor/graph-extractor.service";
import {ASTModuleExtractorService} from "./extractor/ast-module-extractor.service";
import {CODE} from "./model/code";
const fs = require('fs');
const recast = require("recast");

export class Scanner {

    private graphService: GraphExtractorService;
    private astModuleExtractorService: ASTModuleExtractorService;
    public modules: AngularModule[] = [];
    private fileCount: number = 0;

    constructor() {
        this.astModuleExtractorService = new ASTModuleExtractorService();
        this.graphService = new GraphExtractorService();
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

            fs.writeFileSync("./report/report.json", JSON.stringify(this.modules, null, 2));
            const graph = this.graphService.computeGraph(this.modules);
            fs.writeFileSync("./report/nodes.json", JSON.stringify(graph, null, 2));
            fs.writeFileSync("./report/code.js", CODE(graph));
        } else {
            console.log('No files found');
        }
    }

    private processFile(inputFile: string) {
        this.fileCount++;
        const fileContent = fs.readFileSync(inputFile, 'utf-8');
        console.log(this.fileCount, ' scanning file :', inputFile);
        const angularModule = <AngularModule> this.astModuleExtractorService.extractModule(fileContent);
        this.modules.push(angularModule);
    }
    /*

    private convertModuleToGraph(modules: AngularModule[]) {
        fs.writeFileSync("./report/nodes.json", JSON.stringify(graph, null, 2));
        fs.writeFileSync("./report/code.js", CODE(graph));
    }*/

}