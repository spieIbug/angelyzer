import { AngularModule } from '../model/angular-module.model';
import { Validation } from '../model/validation.model';
import { Validator } from './validator';
export declare class ImportRefactorValidator implements Validator {
    /**
     * Import refactor recommendations scan
     * @param modules
     * @returns {Validation[]}
     */
    validate(modules: AngularModule[]): Validation[];
    private getModulesImportsMap;
    /**
     * Exclude RoutingModule for RouterModule check if any other module import RouterModule it will be signaled
     * to be refactored
     * @param aSet
     * @param moduleName
     * @returns {string[]} modules
     */
    private removeRoutingModulesForRouterModule;
}
