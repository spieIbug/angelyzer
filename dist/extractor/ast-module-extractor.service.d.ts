import { AngularModule } from '../model/angular-module.model';
export declare class ASTModuleExtractorService {
    /**
     * Read an Angular Module fileContent and return AngularModule instance containing Decorator properties
     * @param fileContent
     * @returns {any}
     */
    extractModule(fileContent: string): AngularModule;
    /**
     * Extracts Abstract Syntax Tree for typescript
     * @param fileContent
     */
    getAST(fileContent: string): any;
    private extractModuleName(node);
    private extractNgModuleDecorator(node);
    private extractImports(ngModuleDecorator, programBody);
    /**
     * Extracts Imports or Exports from a NgModule decorator.
     *
     * Imports or Exports are simple strings arrays.
     *
     * @param decorator
     * @param programBody
     * @param type
     * @returns {Array}
     */
    private extractImportsExports(decorator, programBody, type?);
    private extractExports(decorator, programBody);
    private extractProviders(decorator, programBody);
    private extractDeclarations(decorator, programBody);
    private extractBootStrap(decorator);
    private extractVariableValues(programBody, varName);
}
