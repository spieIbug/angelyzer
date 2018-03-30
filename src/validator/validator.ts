import { Validation } from '../../dist/model/validation.model';

export interface Validator {
  validate(module, ast?: any): Validation;
}