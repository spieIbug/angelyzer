import {Node} from './node.model';
import {Edge} from './edge.model';

export class Graph {
    nodes: Node[] = [];
    edges: Edge[] = [];


    constructor(params: Partial<Graph>) {
        const {nodes, edges} = params;
        this.nodes = nodes;
        this.edges = edges;
    }
}