import { Graph } from '../model/graph.model';
import { AngularModule } from '../model/angular-module.model';
export declare class GraphExtractorService {
    private nodesService;
    private edgesService;
    constructor();
    computeGraph(modules: AngularModule[]): Graph;
}
