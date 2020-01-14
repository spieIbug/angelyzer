import { AngularComponent } from '../model/angular-component.model';
import { ClassDiagramModel } from '../model/class-diagram.model';
export declare class ComponentMapper {
    toGraph(component: AngularComponent): ClassDiagramModel;
    toGraphs(components: AngularComponent[]): ClassDiagramModel[];
}
