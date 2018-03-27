"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATIONS = function (validations) {
    var content = '';
    for (var _i = 0, validations_1 = validations; _i < validations_1.length; _i++) {
        var validation = validations_1[_i];
        content += "<tr><td>" + validation.rule + "</td><td>" + validation.className + "</td><td>" + validation.error + "</td></tr>";
    }
    return "<!DOCTYPE html>\n        <html>\n            <head>\n                <style>\n                    table {\n                      border-spacing: 0;\n                      border-collapse: collapse;\n                      display: table;\n                      border-color: grey;\n                      width: 100%;\n                      max-width: 100%;\n                      margin-bottom: 20px;\n                    }\n                    th {\n                        vertical-align: bottom;\n                        border-bottom: 2px solid #ddd;\n                        padding: 8px;\n                        line-height: 1.42857143;\n                    }\n                    td {\n                        padding: 8px;\n                        line-height: 1.42857143;\n                        vertical-align: top;\n                        border-top: 1px solid #ddd;\n                    }\n                </style>\n            </head>            \n          <body>\n            <h4>Analysis result for validations : " + validations.length + " modules identified with errors</h4>\n            <table>\n                <tr>\n                    <th>Type</th>\n                    <th>moduleName</th>\n                    <th>error</th>\n                </tr>\n                " + content + "\n            </table>\n          </body>\n        </html>";
};
