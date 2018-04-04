import { AngularModule } from '../model/angular-module.model';
import { Validation } from '../model/validation.model';
import { Validator } from './validator';
export declare class ImportRefactorValidator implements Validator {
    validate(modules: AngularModule[]): Validation[];
    private getModulesImportsMap(modules);
}
