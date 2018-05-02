import { AngularModule } from '../model/angular-module.model';
import { Validation } from '../model/validation.model';
import { Validator } from './validator';
export declare class ImportRefactorValidator implements Validator {
    validate(modules: AngularModule[]): Validation[];
    private getModulesImportsMap(modules);
    /**
     * Excluse RoutingModule for RouterModule check if any other module import RouterModule it will be signaled
     * to be refactored
     * @param aSet
     * @param moduleName
     * @returns {string[]} modules
     */
    private removeRoutingModulesForRouterModule(aSet?, moduleName?);
}
