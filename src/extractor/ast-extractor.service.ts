import recast = require('recast');

export class AstExtractorService {
  /**
   * Extracts Abstract Syntax Tree for typescript
   * @param fileContent
   */
  public getAST(fileContent: string) {
    return recast.parse(fileContent, {
      parser: require("recast/parsers/typescript"), // todo: update to newer typescript version using @typescript-eslint/parser
    });
  }


}
