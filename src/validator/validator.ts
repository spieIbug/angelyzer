import { Validation } from '../../dist/model/validation.model';
import { AngularModule } from '../model/angular-module.model';

export interface Validator {
  /**
   * return a {Validation} object, for the given {AngularModule}, and Abstract syntax tree
   * @param module
   * @param ast : Optional, can be used when looking for variables references
   * @returns {Validation}
   */
  validate(module: AngularModule, ast?: any): Validation;
}