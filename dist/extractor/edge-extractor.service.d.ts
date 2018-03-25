import { Edge } from "../model/edge.model";
import { AngularModule } from "../model/angular-module.model";
export declare class EdgeExtractorService {
    edgesForImports(module: AngularModule): Edge[];
    edgesForExports(module: AngularModule): Edge[];
    edgesForBootstrap(module: AngularModule): Edge[];
    edgesForDeclarations(module: AngularModule): Edge[];
    edgesForProviders(module: AngularModule): Edge[];
}
