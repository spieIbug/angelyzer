import { AngularModule } from '../model/angular-module.model';
import { Validation } from '../model/validation.model';
export declare class CoreModuleValidator {
    /**
     * Validate the given AngularModule and browse AST if the given has providers, and exports
     * @param {AngularModule} module
     * @param ast
     * @returns {Validation} error if CoreModule/SharedModule angular pattern is not accepted
     */
    validate(module: AngularModule, ast: any): Validation;
}
