import { AngularModule } from '../model/angular-module.model';
import { Validation } from '../model/validation.model';
import { Validator } from './validator';
/**
 * A simple Providers validator that checks if the same provider is provider more than once.
 */
export declare class ProvidersRefactorValidator implements Validator {
    private readonly EXLUSION_MODULES;
    /**
     * validate if the given modules has providers defines more than once.
     * @param modules Angular Modules
     * @returns {Validation[]} Empty Array if no validation Error is detected
     */
    validate(modules: AngularModule[]): Validation[];
    /**
     * return a providers modules map for the given angular modules
     * @param modules
     * @returns {Map<string, Set<string>>}
     */
    private getModulesProvidersMap(modules);
    /**
     * remove exclusionModules form modulesSet
     * @param modulesSet
     * @param exclusionModules
     */
    private clean(modulesSet, exclusionModules);
}
