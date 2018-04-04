import { Validator } from './validator';
import { Validation } from '../model/validation.model';
/**
 * a validator that checks if you've not thing like :
 * providers: [FooComponent, BarDirective, OtherPipe],
 * exports: [WrongProvider]
 */
export declare class ProvidersValidator implements Validator {
    validate(module: any, ast?: any): Validation;
}
