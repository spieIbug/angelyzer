import { Validator } from './validator';
import { Validation } from '../../dist/model/validation.model';
import { elementNotInWrightPlace, elementsNotInWrightPlace } from '../template/element-not-in-wright-place.template';
import { RuleEnum } from '../model/rule.enum';

/**
 * a validator that checks if you've not thing like :
 * providers: [FooComponent, BarDirective, OtherPipe],
 * exports: [WrongProvider]
 */
export class DeclarationsValidator implements Validator {
  validate(module, ast?: any): Validation {
    const listOfDeclarationsViolations = [];
    for (const declaration of module.declarations) {
      if (!declaration.match(/.+(Component|Pipe|Directive)$/)) {
        listOfDeclarationsViolations.push(elementNotInWrightPlace(declaration, 'declarations'));
      }
    }
    if (listOfDeclarationsViolations.length > 0) {
      return new Validation({
        rule: RuleEnum.ELEMENT_CAN_NOT_BE_DECLARED.toString(),
        className: module.name,
        error: elementsNotInWrightPlace(listOfDeclarationsViolations)
      });
    }
    return null;
  }
}