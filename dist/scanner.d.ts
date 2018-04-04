export declare class Scanner {
    private graphService;
    private astModuleExtractorService;
    private coreModuleValidation;
    private providersValidator;
    private importsValidator;
    private exportsValidator;
    private declarationsValidator;
    private importRefactorValidator;
    private declarationRefactorValidator;
    private providersRefactorValidator;
    private modules;
    private fileCount;
    private validations;
    constructor();
    scanPath(files: string[], modulePath: string, savePath: string): void;
    private processFile(inputFile);
}
