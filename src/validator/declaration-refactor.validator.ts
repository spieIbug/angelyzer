import { AngularModule } from '../model/angular-module.model';
import { Validation } from '../model/validation.model';
import { RuleEnum } from '../model/rule.enum';
import { Validator } from './validator';

export class DeclarationRefactorValidator implements Validator {
  public validate(modules: AngularModule[]): Validation[] {
    const validations: Validation[] = [];
    const declarationsMap: Map<string, Set<string>> = this.getModulesDeclarationsMap(modules);
    let keys = Array.from(declarationsMap.keys());
    for (const key of keys) {
      const declarationsSet = declarationsMap.get(key);
      if (declarationsSet.size > 1) {
        const parse = JSON.stringify(declarationsSet);
        const validation = new Validation({
          className: key,
          error: `${key} is declared in ${declarationsSet.size} modules, ${parse}. This is so bad`,
          rule: RuleEnum.COMPONENT_DIRECTIVE_PIPE_IN_SINGLE_MODULE.toString()
        });
        validations.push(validation);
      }
    }
    return validations;
  }

  private getModulesDeclarationsMap(modules: AngularModule[]): Map<string, Set<string>> {
    const declarationModulesMap: Map<string, Set<string>> = new Map<string, Set<string>>();
    for (const module of modules) {
      for (const declaration of module.declarations) {
        const modulesSet: Set<string> = declarationModulesMap.get(declaration);
        if (modulesSet) {
          modulesSet.add(module.name);
        } else {
          declarationModulesMap.set(declaration, new Set<string>([module.name]));
        }
      }
    }
    return declarationModulesMap;
  }
}