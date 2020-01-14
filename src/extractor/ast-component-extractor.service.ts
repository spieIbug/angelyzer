import {AngularComponent, Input} from '../model/angular-component.model';
import {filter, forEach, get, map} from 'lodash';
import {AstClassExtractorService} from "./ast-class-extractor.service";

export class ASTComponentExtractorService extends AstClassExtractorService {

  extractComponent(fileContent: string): AngularComponent {
    const component = new AngularComponent(this.extractClass(fileContent));
    const ast = this.getAST(fileContent);
    let nodes = ast.program.body;
    forEach(nodes, (node/*: ExportNamedDeclaration*/) => {
        if (node.type === 'ExportNamedDeclaration' && node.declaration.type === 'ClassDeclaration') {
          component.inputs = map(filter(node.declaration.body.body, p => p.type === 'ClassProperty' && this.isInput(p)), p => new Input({
            name: p.key.name,
            type: this.extractTypeAsString(get(p, 'typeAnnotation.typeAnnotation')),
          }));
          component.outputs = map(filter(node.declaration.body.body, p => p.type === 'ClassProperty' && this.isOutput(p)), p => new Input({
            name: p.key.name,
            type: this.extractTypeAsString(get(p, 'typeAnnotation.typeAnnotation')),
          }));
        }
      }
    );
    return component;
  }

  private isInput(p/*ClassProperty*/): boolean {
    if (!p.decorators) {
      return false;
    }
    return p.decorators.map(d => d.callee.callee.name).includes('Input');
  }

  private isOutput(p/*ClassProperty*/): boolean {
    if (!p.decorators) {
      return false;
    }
    return p.decorators.map(d => d.callee.callee.name).includes('Output');
  }


}
