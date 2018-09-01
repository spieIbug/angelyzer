export declare class AngularModule {
    name: string;
    imports: string[];
    exports: string[];
    declarations: string[];
    bootstrap: string[];
    providers: string[];
    hasVoidElement: boolean;
    constructor(params: Partial<AngularModule>);
}
