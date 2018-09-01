import { Validator } from './validator';
import { AngularModule } from '../model/angular-module.model';
import { Validation } from '../model/validation.model';
export declare class VoidElementValidator implements Validator {
    validate(modules: AngularModule[]): Validation[];
}
