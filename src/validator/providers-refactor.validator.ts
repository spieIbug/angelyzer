import {AngularModule} from '../model/angular-module.model';
import {Validation} from '../model/validation.model';
import {RuleEnum} from '../model/rule.enum';
import {Validator} from './validator';

/**
 * A simple Providers validator that checks if the same provider is provider more than once.
 */
export class ProvidersRefactorValidator implements Validator {

    private readonly EXLUSION_MODULES = ['AppModule', 'SharedModule', 'CoreModule'];

    /**
     * validate if the given modules has providers defines more than once.
     * @param modules Angular Modules
     * @returns {Validation[]} Empty Array if no validation Error is detected
     */
    public validate(modules: AngularModule[]): Validation[] {
        const validations: Validation[] = [];
        const providersMap: Map<string, Set<string>> = this.getModulesProvidersMap(modules);
        let keys = Array.from(providersMap.keys());
        for (const key of keys) {
            const modulesSet = providersMap.get(key);

            this.clean(modulesSet, this.EXLUSION_MODULES);

            if (modulesSet.size > 1) {
                this.clean(modulesSet, ['AppModule', 'SharedModule', 'CoreModule']);
                const parse = JSON.stringify(modulesSet, null, 2);
                const validation = new Validation({
                    className: key,
                    error: `${key} is provided in ${modulesSet.size} modules, <code><pre>${parse}</pre></code> This is so bad`,
                    rule: RuleEnum.PROVIDE_SERVICE_IN_SINGLE_MODULE.toString()
                });
                validations.push(validation);
            }
        }
        return validations;
    }

    /**
     * return a providers modules map for the given angular modules
     * @param modules
     * @returns {Map<string, Set<string>>}
     */
    private getModulesProvidersMap(modules: AngularModule[]): Map<string, Set<string>> {
        const providerModulesMap: Map<string, Set<string>> = new Map<string, Set<string>>();
        for (const module of modules) {
            for (const provider of module.providers) {
                const modulesSet: Set<string> = providerModulesMap.get(provider);
                if (modulesSet) {
                    modulesSet.add(module.name);
                } else {
                    providerModulesMap.set(provider, new Set<string>([module.name]));
                }
            }
        }
        return providerModulesMap;
    }

    /**
     * remove exclusionModules form modulesSet
     * @param modulesSet
     * @param exclusionModules
     */
    private clean(modulesSet: Set<string> = new Set<string>(), exclusionModules: string[]) {
        for (const value of exclusionModules) {
            modulesSet.delete(value);
        }
    }


}