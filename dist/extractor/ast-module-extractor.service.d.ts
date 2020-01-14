import { AngularModule } from '../model/angular-module.model';
import { AstExtractorService } from './ast-extractor.service';
export declare class ASTModuleExtractorService extends AstExtractorService {
    /**
     * Read an Angular Module fileContent and return AngularModule instance containing Decorator properties
     * @param fileContent
     * @returns {any}
     */
    extractModule(fileContent: string): AngularModule;
    private extractModuleName;
    private extractNgModuleDecorator;
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
    private extractImportsExports;
    private extractExports;
    private extractImports;
    /**
     * Extract providers from NgModule decorator
     * @param decorator
     * @param programBody
     * @returns {Array}
     */
    private extractProviders;
    /**
     * Extract declarations from NgModule decorator
     * @param decorator
     * @param programBody
     * @returns {Array}
     */
    private extractDeclarations;
    /**
     * Extract bootstrap properties form NgModule decorator
     * @param decorator
     * @returns {Array}
     */
    private extractBootStrap;
    /**
     * Scan programBody for given varName and return corresponding value
     * @param programBody
     * @param varName
     * @returns {Array}
     */
    private extractVariableValues;
}
