import {Validator} from './validator';
import {RuleEnum} from '../model/rule.enum';
import {elementNotInRightPlace, elementsNotInRightPlace} from '../template/element-not-in-right-place.template';
import {AngularModule} from '../model/angular-module.model';
import {Validation} from '../model/validation.model';

export class ExportsValidator implements Validator {
    /**
     * Validate that exports contains only Component, Pipe, Directive or Module
     * @param module
     * @param ast
     * @returns {Validation}
     */
    validate(module: AngularModule, ast?: any): Validation {
        const listOfExportsViolations = [];
        for (const anExport of module.exports) {
            if (!anExport.match(/.+(Component|Pipe|Directive|Module)$/)) {
                listOfExportsViolations.push(elementNotInRightPlace(anExport, 'exports'));
            }
        }
        if (listOfExportsViolations.length > 0) {
            return new Validation({
                rule: RuleEnum.EXPORT_MEMBERS.toString(),
                className: module.name,
                error: elementsNotInRightPlace(listOfExportsViolations)
            });
        }
        return null;
    }

}