import { TSClass } from "../model/angular-component.model";
import { ClassDiagramModel } from "../model/class-diagram.model";
export declare class ClassMapper {
    toGraph(clazz: TSClass, classes: {
        [name: string]: TSClass;
    }): ClassDiagramModel;
    toGraphs(classes: TSClass[]): ClassDiagramModel[];
}
