import { AngularComponent } from '../model/angular-component.model';
import { AstClassExtractorService } from "./ast-class-extractor.service";
export declare class ASTComponentExtractorService extends AstClassExtractorService {
    extractComponent(fileContent: string): AngularComponent;
    private isInput;
    private isOutput;
}
