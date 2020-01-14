import { AngularComponent, Dependency, Param } from '../model/angular-component.model';
import { AstExtractorService } from './ast-extractor.service';
export declare class ASTComponentExtractorService extends AstExtractorService {
    extractComponent(fileContent: string): AngularComponent;
    private isInput;
    private isOutput;
    extractDependencies(constructorMethod: any): Dependency[];
    private extractMethodDefinition;
    private extractTypeAsString;
    getParamValue(param: any): Param;
}
