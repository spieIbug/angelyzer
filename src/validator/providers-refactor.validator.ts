import { AngularModule } from '../model/angular-module.model';
import { Validation } from '../model/validation.model';
import { RuleEnum } from '../model/rule.enum';
import { Validator } from './validator';

export class ProvidersRefactorValidator implements Validator {
  public validate(modules: AngularModule[]): Validation[] {
    const validations: Validation[] = [];
    const providersMap: Map<string, Set<string>> = this.getModulesProvidersMap(modules);
    let keys = Array.from(providersMap.keys());
    for (const key of keys) {
      const providersSet = providersMap.get(key);
      this.clean(providersSet, ['AppModule', 'SharedModule', 'CoreModule']);
      if (providersSet.size > 1) {
        this.clean(providersSet, ['AppModule', 'SharedModule', 'CoreModule']);
        const parse = JSON.stringify(providersSet);
        const validation = new Validation({
          className: key,
          error: `${key} is provided in ${providersSet.size} modules, ${parse}. This is so bad`,
          rule: RuleEnum.PROVIDE_SERVICE_IN_SINGLE_MODULE.toString()
        });
        validations.push(validation);
      }
    }
    return validations;
  }

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

  private clean(aSet: Set<string> = new Set<string>(), values: string[]) {
    for (const value of values) {
      aSet.delete(value);
    }
  }
}