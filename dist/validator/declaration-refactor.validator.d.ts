import { AngularModule } from '../model/angular-module.model';
import { Validation } from '../model/validation.model';
import { Validator } from './validator';
export declare class DeclarationRefactorValidator implements Validator {
    /**
     * Check if a Component, Directive, Pipe is declared in multiple modules
     * @param modules
     * @returns {Validation[]}
     */
    validate(modules: AngularModule[]): Validation[];
    private getModulesDeclarationsMap;
}
