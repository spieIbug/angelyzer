import {EdgeExtractorService} from './edge-extractor.service';
import {NodeExtractorService} from './node-extractor.service';
import {Graph} from '../model/graph.model';
import {Edge} from '../model/edge.model';
import {Node} from '../model/node.model';
import {AngularModule} from '../model/angular-module.model';
export class GraphExtractorService {
    private nodesService: NodeExtractorService;
    private edgesService: EdgeExtractorService;


    constructor() {
        this.nodesService = new NodeExtractorService();
        this.edgesService = new EdgeExtractorService();
    }

    public computeGraph(modules: AngularModule[]): Graph {
        const nodes = [];
        const edges = [];
        for (const module of modules) {
            nodes.push(this.nodesService.moduleToNode(module));
            // todo: code plus avec elegance
            nodes.push(...this.nodesService.importsToNodes(module));
            edges.push(...this.edgesService.edgesForImports(module));

            nodes.push(...this.nodesService.exportsToNodes(module));
            edges.push(...this.edgesService.edgesForExports(module));


            nodes.push(...this.nodesService.bootstrapToNodes(module));
            edges.push(...this.edgesService.edgesForBootstrap(module));

            nodes.push(...this.nodesService.declarationsToNodes(module));
            edges.push(...this.edgesService.edgesForDeclarations(module));

            nodes.push(...this.nodesService.providersToNodes(module));
            edges.push(...this.edgesService.edgesForProviders(module));
        }
        // remove duplicates
        const nodeArray = new Set<Node>(nodes);
        const edgesArray = new Set<Edge>(edges);

        return new Graph({
            edges: Array.from(edgesArray.values()),
            nodes: Array.from(nodeArray.values())
        });
    }
}