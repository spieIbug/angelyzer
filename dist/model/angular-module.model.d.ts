export declare class AngularModule {
    name: string;
    imports: string[];
    exports: string[];
    declarations: string[];
    bootstrap: string[];
    providers: string[];
    constructor(params: Partial<AngularModule>);
}
