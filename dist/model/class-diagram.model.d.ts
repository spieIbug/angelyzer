import { Input, Method, Output, Property } from './angular-component.model';
export declare class ClassDiagramModel {
    nodes: UMLNode[];
    links: UMLLink[];
}
export declare class UMLNode {
    key: string;
    name: string;
    properties: Property[];
    inputs: Input[];
    outputs: Output[];
    methods: Method[];
    constructor(node: Partial<UMLNode>);
}
export declare class UMLLink {
    from: string;
    to: string;
    relationship: 'generalization' | 'aggregation';
    constructor(link: Partial<UMLLink>);
}
