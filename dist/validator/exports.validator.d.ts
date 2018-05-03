import { Validator } from './validator';
import { AngularModule } from '../model/angular-module.model';
import { Validation } from '../model/validation.model';
export declare class ExportsValidator implements Validator {
    /**
     * Validate that exports contains only Component, Pipe, Directive or Module
     * @param module
     * @param ast
     * @returns {Validation}
     */
    validate(module: AngularModule, ast?: any): Validation;
}
