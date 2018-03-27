import {Node} from '../model/node.model';
import {AngularModule} from '../model/angular-module.model';

export class NodeExtractorService {
    public importsToNodes(module: AngularModule): Node[] {
        if (module.imports) {
            return module.imports.map(anImport => (new Node({
                data: {
                    id: anImport,
                    name: anImport,
                    faveColor: '#F5A45D',
                    faveShape: 'rectangle'
                }
            })));
        }
        return [];
    }

    public exportsToNodes(module: AngularModule): Node[] {
        if (module.exports) {
            return module.exports.map(anExport => {
                    if (anExport.indexOf('Module') !== -1) {
                        return new Node({
                            data: {
                                id: anExport,
                                name: anExport,
                                faveColor: '#F5A45D',
                                faveShape: 'rectangle'
                            }
                        });
                    }
                    return new Node({
                        data: {
                            id: anExport,
                            name: anExport,
                            faveColor: '#0df500',
                            faveShape: 'rectangle'
                        }
                    });
                }
            );
        }
        return [];
    }

    public moduleToNode(module: AngularModule): Node {
        const node = new Node({data: {id: module.name, name: module.name, faveColor: '#F5A45D', faveShape: 'rectangle'}});
        return node;
    }

    public bootstrapToNodes(module: AngularModule): Node[] {
        if (module.bootstrap) {
            return module.bootstrap.map(bootstrap => (new Node({
                data: {id: bootstrap, name: bootstrap, faveColor: '#00006F', faveShape: 'triangle'}
            })));
        }
        return [];
    }

    public declarationsToNodes(module: AngularModule): Node[] {
        if (module.declarations) {
            return module.declarations.map(declaration => (new Node({
                data: {id: declaration, name: declaration, faveColor: '#2a586f', faveShape: 'triangle'}
            })));
        }
        return [];
    }

    public providersToNodes(module: AngularModule): Node[] {
        if (module.providers) {
            return module.providers.map(declaration => (new Node({
                data: {id: declaration, name: declaration, faveColor: '#EDA1ED', faveShape: 'ellipse'}
            })));
        }
        return [];
    }

}