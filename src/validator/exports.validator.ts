import { Validator } from './validator';
import { AngularModule } from '../../dist/model/angular-module.model';
import { Validation } from '../../dist/model/validation.model';
import { RuleEnum } from '../model/rule.enum';
import { elementNotInWrightPlace, elementsNotInWrightPlace } from '../template/element-not-in-wright-place.template';

export class ExportsValidator implements Validator {
  validate(module: AngularModule, ast?: any): Validation {
    const listOfExportsViolations = [];
    for (const anExport of module.exports) {
      if (!anExport.match(/.+(Component|Pipe|Directive|Module)$/)) {
        listOfExportsViolations.push(elementNotInWrightPlace(anExport, 'exports'));
      }
    }
    if (listOfExportsViolations.length > 0) {
      return new Validation({
        rule: RuleEnum.EXPORT_MEMBERS.toString(),
        className: module.name,
        error: elementsNotInWrightPlace(listOfExportsViolations)
      });
    }
    return null;
  }

}