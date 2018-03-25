import { AngularModule } from "./model/angular-module.model";
export declare class Scanner {
    private graphService;
    private astModuleExtractorService;
    modules: AngularModule[];
    private fileCount;
    constructor();
    scanPath(files: string[], modulePath: string): void;
    private processFile(inputFile);
}
