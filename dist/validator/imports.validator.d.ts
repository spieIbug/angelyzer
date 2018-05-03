import { Validator } from './validator';
import { Validation } from '../model/validation.model';
import { AngularModule } from '../model/angular-module.model';
/**
 * Angular Modules Imports validator
 */
export declare class ImportsValidator implements Validator {
    /**
     * validate if the given module does not have other objects thant Modules in imports
     * @param module
     * @param ast
     * @returns {Validation}
     */
    validate(module: AngularModule, ast?: any): Validation;
}
