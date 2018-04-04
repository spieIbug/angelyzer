export declare class Edge {
    data: {
        source: string;
        target: string;
        faveColor?: string;
        strength?: number;
    };
    constructor(params: Partial<Edge>);
}
