import {Validator} from './validator';
import {elementNotInWrightPlace, elementsNotInWrightPlace} from '../template/element-not-in-right-place.template';
import {RuleEnum} from '../model/rule.enum';
import {Validation} from '../model/validation.model';

/**
 * A validator that checks if you've not thing like :
 * providers: [FooComponent, BarDirective, OtherPipe],
 * exports: [WrongProvider]
 */
export class DeclarationsValidator implements Validator {
    /**
     * Detect bad declarations objects
     * @param module
     * @param ast
     * @returns {any}
     */
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