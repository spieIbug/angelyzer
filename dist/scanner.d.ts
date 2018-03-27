import { AngularModule } from './model/angular-module.model';
export declare class Scanner {
    private graphService;
    private astModuleExtractorService;
    private coreModuleValidation;
    modules: AngularModule[];
    private fileCount;
    private validations;
    constructor();
    scanPath(files: string[], modulePath: string): void;
    private processFile(inputFile);
}
