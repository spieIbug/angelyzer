import {Edge} from '../model/edge.model';
import {AngularModule} from '../model/angular-module.model';
export class EdgeExtractorService {
    public edgesForImports(module: AngularModule): Edge[] {
        if (module.imports) {
            return module.imports.map(anImport => (new Edge({
                data: {source: anImport, target: module.name, faveColor: '#00006F', strength: 10}
            })));
        }
        return [];
    }

    public edgesForExports(module: AngularModule): Edge[] {
        if (module.exports) {
            return module.exports.map(anExport => (new Edge({
                data: {source: module.name, target: anExport, faveColor: '#00006F', strength: 10}
            })));
        }
        return [];
    }

    public edgesForBootstrap(module: AngularModule): Edge[] {
        if (module.bootstrap) {
            return module.bootstrap.map(bootstrap => (new Edge({
                data: {source: module.name, target: bootstrap, faveColor: '#505050', strength: 10}
            })));
        }
        return [];
    }
    public edgesForDeclarations(module: AngularModule): Edge[] {
        if (module.declarations) {
            return module.declarations.map(declaration => (new Edge({
                data: {source: module.name, target: declaration, faveColor: '#FFD90B', strength: 10}
            })));
        }
        return [];
    }
    public edgesForProviders(module: AngularModule): Edge[] {
        if (module.providers) {
            return module.providers.map(provider => (new Edge({
                data: {source: module.name, target: provider, faveColor: '#EDA1ED', strength: 10}
            })));
        }
        return [];
    }
}