import { Validation } from '../model/validation.model';

export const refactorTemplate = (validations: Validation[]) => {
  let content: string = '';
  for (const validation of validations) {
    content += `<tr><td>${validation.rule}</td><td>${validation.className}</td><td>${validation.error}</td></tr>`;
  }
  return `<!DOCTYPE html>
        <html>
            <head>
                <link href="style.css" rel="stylesheet">
            </head>            
          <body>
            <div class="toolbar sticky">
                <div class="toolbar-row">
                    <div class="toolbar-menu">
                        <ul class="menu-elements">
                            <li class="menu-element"><img src="https://angular.io/assets/images/logos/angular/logo-nav@2x.png" class="logo"></li>
                            <li class="menu-element"><a class="menu-link" href="index.html">graph</a></li>
                            <li class="menu-element"><a class="menu-link" href="validations.html">validations</a></li>
                            <li class="menu-element"><a class="menu-link" href="refactor.html">refactor</a></li>
                            <li class="menu-element"><a class="menu-link" href="declarations.html">declarations</a></li>
                            <li class="menu-element"><a class="menu-link" href="providers.html">providers</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="content">
              <h4>Analysis result for refactor : ${validations.length} modules can be refactored</h4>
              <table>
                  <tr>
                      <th>Type</th>
                      <th>moduleName</th>
                      <th>error</th>
                  </tr>
                  ${content}
              </table>
            </div>
          </body>
        </html>`;
};