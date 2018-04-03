import { Validator } from './validator';
import { AngularModule } from '../../dist/model/angular-module.model';
import { Validation } from '../../dist/model/validation.model';
import { RuleEnum } from '../model/rule.enum';
import { elementNotInWrightPlace, elementsNotInWrightPlace } from '../template/element-not-in-wright-place.template';

export class ImportsValidator implements Validator {
  validate(module: AngularModule, ast?: any): Validation {
    const listOfImportsViolations = [];
    for (const anImport of module.imports) {
      if (!anImport.match(/.+Module$/)) {
        listOfImportsViolations.push(elementNotInWrightPlace(anImport, 'imports'));
      }
    }
    if (listOfImportsViolations.length > 0) {
      return new Validation({
        rule: RuleEnum.IMPORT_NON_MODULE.toString(),
        className: module.name,
        error: elementsNotInWrightPlace(listOfImportsViolations)
      });
    }
    return null;
  }

}