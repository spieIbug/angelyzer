import {AngularComponent, TSClass} from "../model/angular-component.model";
import {ClassDiagramModel, UMLLink, UMLNode} from "../model/class-diagram.model";
import {keyBy, map} from 'lodash';

export class ClassMapper {
    toGraph(clazz: TSClass, classes: {[name: string]: TSClass}): ClassDiagramModel {
        const uml = new ClassDiagramModel();
        uml.nodes = [
            new UMLNode({
                key: clazz.name,
                name: clazz.name,
                properties: clazz.properties,
                methods: clazz.methods,
            }),
            ...map(clazz.dependencies, dep => {
                const cl = classes[dep.type];
                if (cl) {
                    return new UMLNode({...cl, key: cl?.name})
                }
                new UMLNode({key: dep.type, name: dep.type});
            }).filter(v => !!v),
        ];
        if (clazz.extends) {
            uml.nodes.push(new UMLNode({key: clazz.extends, name: clazz.extends}));
        }

        uml.links = [
            ...map(clazz.dependencies, dep => new UMLLink({ from: clazz.name, to: dep.type, relationship: 'aggregation' })),
            ...map(clazz.implements, implem => new UMLLink({ from: clazz.name, to: implem, relationship: 'generalization' })),
        ];
        if (clazz.extends) {
            uml.links.push(new UMLLink({
                from: clazz.name,
                to: clazz.extends,
                relationship: 'generalization',
            }));
        }
        return uml;
    }

    toGraphs(classes: TSClass[]): ClassDiagramModel[] {
        const classesMap = keyBy(classes, 'name');
        return map(classes, clazz => this.toGraph(clazz, classesMap));
    }
}