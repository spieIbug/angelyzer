import { Validation } from '../model/validation.model';

export const VALIDATIONS = (validations: Validation[]) => {
  let content: string = '';
  for (const validation of validations) {
    content += `<tr><td>${validation.rule}</td><td>${validation.className}</td><td>${validation.error}</td></tr>`;
  }
  return `<!DOCTYPE html>
        <html>
            <head>
                <style>
                    table {
                      border-spacing: 0;
                      border-collapse: collapse;
                      display: table;
                      border-color: grey;
                      width: 100%;
                      max-width: 100%;
                      margin-bottom: 20px;
                    }
                    th {
                        vertical-align: bottom;
                        border-bottom: 2px solid #ddd;
                        padding: 8px;
                        line-height: 1.42857143;
                    }
                    td {
                        padding: 8px;
                        line-height: 1.42857143;
                        vertical-align: top;
                        border-top: 1px solid #ddd;
                    }
                </style>
            </head>            
          <body>
            <h4>Analysis result for validations : ${validations.length} modules identified with errors</h4>
            <table>
                <tr>
                    <th>Type</th>
                    <th>moduleName</th>
                    <th>error</th>
                </tr>
                ${content}
            </table>
          </body>
        </html>`;
}