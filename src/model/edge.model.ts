export class Edge {
    data: {
        source: string;
        target: string;
        faveColor?: string;
        strength?: number;
    };


    constructor(params: Partial<Edge>) {
        const {source, target, faveColor, strength} = params.data;
        this.data = {source: null, target: null, faveColor: null, strength: null};
        this.data.source = source;
        this.data.target = target;
        this.data.faveColor = faveColor;
        this.data.strength = strength;
    }
}
