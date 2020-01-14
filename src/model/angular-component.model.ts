export class Property {
  name: string;
  type: string;
  visibility: 'public' | 'private' | 'protected';
  static = false;
  readonly = false;

  constructor(obj?: Partial<Property>) {
    Object.assign(this, obj);
  }
}
export class Method {
  name: string;
  visibility: 'public' | 'private' | 'protected';
  static= false;
  parameters: Param[];
  returns : string;

  constructor(method?: Partial<Method>) {
    Object.assign(this, method);
  }
}
export class Param {
  name: string;
  visibility: 'public' | 'private' | 'protected';
  type: string;
  value: string;

  constructor(param?: Partial<Param>) {
    Object.assign(this, param);
  }
}
export class Dependency {
  name: string;
  type: string;
  visibility: 'public' | 'private' | 'protected';
  constructor(dep?: Partial<Dependency>) {
    Object.assign(this, dep);
  }
}
export class TSClass {
  name: string;
  extends: string;
  implements: string[] = [];
  dependencies: Dependency[];
  properties: Property[];
  methods: Method[];

  constructor(clazz?: Partial<TSClass>) {
    Object.assign(this, clazz);
  }
}
export class Input {
  name: string;
  type: string;

  constructor(input?: Partial<Input>) {
    Object.assign(this, input);
  }
}
export class Output {
  name: string;
  type: string;

  constructor(output?: Partial<Output>) {
    Object.assign(this, output);
  }
}
export class AngularComponent extends TSClass {
  inputs: Input[];
  outputs: Output[];

  constructor(clazz?: Partial<AngularComponent>, inputs?: Input[], outputs?: Output[]) {
    super(clazz);
    this.inputs = inputs;
    this.outputs = outputs;
  }
}
