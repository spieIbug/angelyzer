import { Input, Method, Output, Property } from './angular-component.model';

export class ClassDiagramModel {
  nodes: UMLNode[] = [];
  links: UMLLink[] = [];
}

export class UMLNode {
  key: string;
  name: string;
  properties: Property[];
  inputs: Input[];
  outputs: Output[];
  methods: Method[];

  constructor(node: Partial<UMLNode>) {
    Object.assign(this, node);
  }
}

export class UMLLink {
  from: string;
  to: string;
  relationship: 'generalization' | 'aggregation';

  constructor(link: Partial<UMLLink>) {
    Object.assign(this, link);
  }
}
