import { Node } from '../model/node.model';
import { AngularModule } from '../model/angular-module.model';
export declare class NodeExtractorService {
    importsToNodes(module: AngularModule): Node[];
    exportsToNodes(module: AngularModule): Node[];
    moduleToNode(module: AngularModule): Node;
    bootstrapToNodes(module: AngularModule): Node[];
    declarationsToNodes(module: AngularModule): Node[];
    providersToNodes(module: AngularModule): Node[];
}
