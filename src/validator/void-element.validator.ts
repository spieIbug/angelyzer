import { Validator } from './validator';
import { AngularModule } from '../model/angular-module.model';
import { Validation } from '../model/validation.model';
import { RuleEnum } from '../model/rule.enum';

export class VoidElementValidator implements Validator {
    validate(modules: AngularModule[]): Validation[] {
        const validations: Validation[] = [];
        for (let mod of modules) {
            if (mod.hasVoidElement) {
                validations.push({
                    rule: RuleEnum.NO_VOID_ELEMENT_IN_MODULE_DEFINITION.toString(),
                    className: mod.name,
                    error: shouldNotHaveVoidTemplate(mod.name)
                });
            }
        }

        return validations;
    }
}

function shouldNotHaveVoidTemplate(moduleName: string) : string {
    return `The module ${moduleName} should not have an empty array of import, export, declaration or provider`;
}