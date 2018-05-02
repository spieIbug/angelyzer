import {AngularModule} from '../model/angular-module.model';
import {Validation} from '../model/validation.model';
import {RuleEnum} from '../model/rule.enum';
import {Validator} from './validator';

export class ImportRefactorValidator implements Validator {
    public validate(modules: AngularModule[]): Validation[] {
        const validations: Validation[] = [];
        const importsMap: Map<string, Set<string>> = this.getModulesImportsMap(modules);
        let keys = Array.from(importsMap.keys());
        for (const key of keys) {
            const importsSet = importsMap.get(key);
            let modules = this.removeRoutingModulesForRouterModule(importsSet, key);
            if (modules.length > 1) {
                const parse = JSON.stringify(modules, null, 2);
                const validation = new Validation({
                    className: key,
                    error: `${key} is imported in ${importsSet.size} modules,<br/> ${parse}.<br/>You can move it to SharedModule`,
                    rule: RuleEnum.MODULE_MULTIPLE_IMPORT_REFACTOR.toString()
                });
                validations.push(validation);
            }
        }
        return validations;
    }

    private getModulesImportsMap(modules: AngularModule[]): Map<string, Set<string>> {
        const importModulesMap: Map<string, Set<string>> = new Map<string, Set<string>>();
        for (const module of modules) {
            for (const anImport of module.imports) {
                const modulesSet: Set<string> = importModulesMap.get(anImport);
                if (modulesSet) {
                    modulesSet.add(module.name);
                } else {
                    importModulesMap.set(anImport, new Set<string>([module.name]));
                }
            }
        }
        return importModulesMap;
    }

    /**
     * Excluse RoutingModule for RouterModule check if any other module import RouterModule it will be signaled
     * to be refactored
     * @param aSet
     * @param moduleName
     * @returns {string[]} modules
     */
    private removeRoutingModulesForRouterModule(aSet: Set<string> = new Set<string>(), moduleName: string = 'RouterModule'): string[] {
        let values: string[] = aSet.toJSON();
        if (moduleName === 'RouterModule') {
            for (let value of values) {
                const routingModules = value.match(/^.+RoutingModule$/gi);
                if (routingModules) {
                    values = values.splice(values.indexOf(routingModules[0]), 1);
                }
            }
        }
        return values;
    }
}