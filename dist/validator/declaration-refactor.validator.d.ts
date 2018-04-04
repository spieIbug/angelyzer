import { AngularModule } from '../model/angular-module.model';
import { Validation } from '../model/validation.model';
import { Validator } from './validator';
export declare class DeclarationRefactorValidator implements Validator {
    validate(modules: AngularModule[]): Validation[];
    private getModulesDeclarationsMap(modules);
}
