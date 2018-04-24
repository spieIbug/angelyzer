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
    private extractImports(ngModuleDecorator, programBody);
    /**
     * Extract providers from NgModule decorator
     * @param decorator
     * @param programBody
     * @returns {Array}
     */
    private extractProviders(decorator, programBody);
    /**
     * Extract declarations from NgModule decorator
     * @param decorator
     * @param programBody
     * @returns {Array}
     */
    private extractDeclarations(decorator, programBody);
    /**
     * Extract bootstrap properties form NgModule decorator
     * @param decorator
     * @returns {Array}
     */
    private extractBootStrap(decorator);
    /**
     * Scan programBody for given varName and return corresponding value
     * @param programBody
     * @param varName
     * @returns {Array}
     */
    private extractVariableValues(programBody, varName);
}
