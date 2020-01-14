export declare class Property {
    name: string;
    type: string;
    visibility: 'public' | 'private' | 'protected';
    static: boolean;
    readonly: boolean;
    constructor(obj?: Partial<Property>);
}
export declare class Method {
    name: string;
    visibility: 'public' | 'private' | 'protected';
    static: boolean;
    parameters: Param[];
    returns: string;
    constructor(method?: Partial<Method>);
}
export declare class Param {
    name: string;
    visibility: 'public' | 'private' | 'protected';
    type: string;
    value: string;
    constructor(param?: Partial<Param>);
}
export declare class Dependency {
    name: string;
    type: string;
    visibility: 'public' | 'private' | 'protected';
    constructor(dep?: Partial<Dependency>);
}
export declare class TSClass {
    name: string;
    extends: string;
    implements: string[];
    dependencies: Dependency[];
    properties: Property[];
    methods: Method[];
    constructor(clazz?: Partial<TSClass>);
}
export declare class Input {
    name: string;
    type: string;
    constructor(input?: Partial<Input>);
}
export declare class Output {
    name: string;
    type: string;
    constructor(output?: Partial<Output>);
}
export declare class AngularComponent extends TSClass {
    inputs: Input[];
    outputs: Output[];
    constructor(clazz?: Partial<AngularComponent>, inputs?: Input[], outputs?: Output[]);
}
