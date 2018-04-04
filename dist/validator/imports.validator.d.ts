import { Validator } from './validator';
import { Validation } from '../model/validation.model';
import { AngularModule } from '../model/angular-module.model';
export declare class ImportsValidator implements Validator {
    validate(module: AngularModule, ast?: any): Validation;
}
