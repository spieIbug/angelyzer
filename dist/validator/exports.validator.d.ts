import { Validator } from './validator';
import { AngularModule } from '../model/angular-module.model';
import { Validation } from '../model/validation.model';
export declare class ExportsValidator implements Validator {
    validate(module: AngularModule, ast?: any): Validation;
}
