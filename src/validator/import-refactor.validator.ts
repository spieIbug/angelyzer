import { AngularModule } from '../model/angular-module.model';
import { Validation } from '../model/validation.model';
import { RuleEnum } from '../model/rule.enum';
import { Validator } from './validator';

export class ImportRefactorValidator implements Validator {
  public validate(modules: AngularModule[]): Validation[] {
    const validations: Validation[] = [];
    const importsMap: Map<string, Set<string>> = this.getModulesImportsMap(modules);
    let keys = Array.from(importsMap.keys());
    for (const key of keys) {
      const importsSet = importsMap.get(key);
      if (importsSet.size > 1) {
        const parse = JSON.stringify(importsSet);
        const validation = new Validation({
          className: key,
          error: `${key} is imported in ${importsSet.size} modules, ${parse}. You can move it to SharedModule`,
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
}