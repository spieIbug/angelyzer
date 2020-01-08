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

export class Input {
  name: string;
  type: string;
}

export class Output {
  name: string;
  type: string;
}

export class Dependency {
  name: string;
  type: string;
  visibility: 'public' | 'private' | 'protected';

  constructor(dep?: Partial<Dependency>) {
    Object.assign(this, dep);
  }
}

export class AngularComponent {
  name: string;
  properties: Property[];
  methods: Method[];
  inputs: Input[];
  outputs: Output[];
  dependencies: Dependency[];
  extends: string;
  implements: string[] = [];
}
