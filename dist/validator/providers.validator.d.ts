import { Validator } from './validator';
import { Validation } from '../model/validation.model';
/**
 * A validator that checks if you've not thing like :
 * providers: [FooComponent, BarDirective, OtherPipe],
 * exports: [WrongProvider]
 */
export declare class ProvidersValidator implements Validator {
    /**
     * Detect bad providers
     * @param module
     * @param ast
     * @returns {any}
     */
    validate(module: any, ast?: any): Validation;
}
