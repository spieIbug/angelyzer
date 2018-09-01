export class AngularModule {
    name: string;
    imports: string[];
    exports: string[];
    declarations: string[];
    bootstrap: string[];
    providers: string[];
    hasVoidElement: boolean;


    constructor(params: Partial<AngularModule>) {
        const {name, imports, exports, declarations, bootstrap, providers, hasVoidElement} = params;
        this.name = name;
        this.imports = imports;
        this.exports = exports;
        this.declarations = declarations;
        this.bootstrap = bootstrap;
        this.providers = providers;
        this.hasVoidElement = hasVoidElement;
    }
}