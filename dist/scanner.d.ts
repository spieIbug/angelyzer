export declare class Scanner {
    private graphService;
    private astModuleExtractorService;
    private astComponentExtractorService;
    private coreModuleValidation;
    private providersValidator;
    private importsValidator;
    private exportsValidator;
    private declarationsValidator;
    private importRefactorValidator;
    private declarationRefactorValidator;
    private providersRefactorValidator;
    private voidElementValidator;
    private validations;
    private componentMapper;
    private classMapper;
    private modules;
    private components;
    private classes;
    private moduleFilesCount;
    private componentFilesCount;
    private filesCount;
    constructor();
    scanComponents(files: string[], componentPath: string, savePath: string): void;
    scanFiles(files: string[], path: string, savePath: string, suffix: string): void;
    scanModules(files: string[], modulePath: string, savePath: string): void;
    /**
     * Scan component.ts file
     * @param inputFile
     */
    private processComponentFile;
    private processFile;
    private processModuleFile;
}
