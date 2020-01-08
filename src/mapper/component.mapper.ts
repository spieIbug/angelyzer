import { AngularComponent } from '../model/angular-component.model';
import { ClassDiagramModel, UMLLink, UMLNode } from '../model/class-diagram.model';
import { map } from 'lodash';

export class ComponentMapper {
  toGraph(component: AngularComponent): ClassDiagramModel {
    const uml = new ClassDiagramModel();
    uml.nodes = [
      new UMLNode({
        key: component.name,
        name: component.name,
        properties: component.properties,
        methods: component.methods,
      }),
      ...map(component.dependencies, dep => new UMLNode({key: dep.type, name: dep.type})),
    ];
    if (component.extends) {
      uml.nodes.push(new UMLNode({key: component.extends, name: component.extends}));
    }

    uml.links = [
      ...map(component.dependencies, dep => new UMLLink({ from: component.name, to: dep.type, relationship: 'aggregation' })),
      ...map(component.implements, implem => new UMLLink({ from: component.name, to: implem, relationship: 'generalization' })),
    ];
    if (component.extends) {
      uml.links.push(new UMLLink({
        from: component.name,
        to: component.extends,
        relationship: 'generalization',
      }));
    }
    return uml;
  }

  toGraphs(components: AngularComponent[]): ClassDiagramModel[] {
    return map(components, component => this.toGraph(component));
  }
}
