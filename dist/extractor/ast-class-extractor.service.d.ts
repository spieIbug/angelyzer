import { AstExtractorService } from './ast-extractor.service';
import { Dependency, Method, Param, TSClass } from '../model/angular-component.model';
export declare class AstClassExtractorService extends AstExtractorService {
    extractClass(fileContent: string): TSClass;
    extractDependencies(constructorMethod: any): Dependency[];
    getParamValue(param: any): Param;
    protected extractMethodDefinition(method: any): Method;
    protected extractTypeAsString(paramType: any): string;
}
