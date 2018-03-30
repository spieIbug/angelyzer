import { AngularModule } from '../model/angular-module.model';
import { Validation } from '../model/validation.model';
import { forRootRecommandationTemplate } from '../template/for-root.template';
import { Validator } from './validator';

/**
 * Validator that check if you have defined exports, and providers in same module without forRoot method
 */
export class CoreModuleValidator implements Validator {

  /**
   * Validate the given AngularModule and browse AST if the given has providers, and exports
   * @param {AngularModule} module
   * @param ast
   * @returns {Validation} error if CoreModule/SharedModule angular pattern is not accepted
   */
  public validate(module: AngularModule, ast: any): Validation {
    if (module.providers.length > 0 && module.exports.length > 0) {
      let nodes = ast.program.body;

      for (const node of nodes) {
        if (node.type === 'ExportNamedDeclaration' && node.declaration.type === 'ClassDeclaration') {
          for (const element of node.declaration.body) {
            if (element.type === 'MethodDefinition' && element.static) {
              if (element.key.name === 'forRoot') {
                return null;
              }
            }
          }
          return new Validation({
            rule: 'CoreModule/SharedModule',
            className: module.name,
            error: forRootRecommandationTemplate(module)
          });
        }
      }
    }
    return null;
  }
}