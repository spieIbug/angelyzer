import { Node } from './node.model';
import { Edge } from './edge.model';
export declare class Graph {
    nodes: Node[];
    edges: Edge[];
    constructor(params: Partial<Graph>);
}
