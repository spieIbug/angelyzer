import { AngularModule } from '../model/angular-module.model';
export declare class ASTModuleExtractorService {
    extractModule(fileContent: string): AngularModule;
    private extractModuleName(node);
    private extractNgModuleDecorator(node);
    private extractImports(ngModuleDecorator, programBody);
    private extractExports(decorator, programBody);
    private extractProviders(decorator, programBody);
    private extractDeclarations(decorator, programBody);
    private extractBootStrap(decorator);
    private extractVariableValues(programBody, varName);
}
