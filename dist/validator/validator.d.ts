import { AngularModule } from '../model/angular-module.model';
import { Validation } from '../model/validation.model';
export interface Validator {
    /**
     * return a {Validation} object, for the given {AngularModule}, and Abstract syntax tree
     * @param module
     * @param ast : Optional, can be used when looking for variables references
     * @returns {Validation}
     */
    validate(module: AngularModule | AngularModule[], ast?: any): Validation | Validation[];
}
