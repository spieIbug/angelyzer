import { AngularModule } from '../model/angular-module.model';
import { Validation } from '../model/validation.model';

export class CoreModuleValidator {

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
            error: `<p>The module ${module.name} has exports ${JSON.stringify(module.exports)} and providers ${JSON.stringify(module.providers)}</p>
            <p>You should have a :</p>
            <code>
            static forRoot(): ModuleWithProviders {
              return {
                ngModule: ${module.name},
                providers: ${JSON.stringify(module.providers)}
              };
            }
            </code>
            <p>Or define a CoreModule that only provide ${JSON.stringify(module.providers)}</p>
            
            <p>Becarefull : the forRoot is for AppModule not children.</p>
           
            <a href="https://angular.io/guide/singleton-services">@see</a> & <a href="https://angular.io/guide/ngmodule-faq#why-is-it-bad-if-a-shared-module-provides-a-service-to-a-lazy-loaded-module">@see</a>
            `
          });
        }
      }
    }
    return null;
  }
}