import { AngularComponent, Dependency, Method, Param, Property } from '../model/angular-component.model';
import { forEach, find, map, get, filter, flattenDeep } from 'lodash';
import { AstExtractorService } from './ast-extractor.service';

export class ASTComponentExtractorService extends AstExtractorService {

  public extractComponent(fileContent: string): AngularComponent {
    const ast = this.getAST(fileContent);
    let nodes = ast.program.body;
    const component = new AngularComponent();
    forEach(nodes, (node/*: ExportNamedDeclaration*/) => {
      if (node.type === 'ExportNamedDeclaration' && node.declaration.type === 'ClassDeclaration') {
        component.name = node.declaration.id.name;
        component.implements = map(node.declaration.implements, implem => implem.expression.name);
        component.extends = get(node.declaration, 'superClass.name');
        component.properties = map(filter(node.declaration.body.body, p => p.type === 'ClassProperty'), p => new Property({
          name: p.key.name,
          visibility: p.accessibility || 'public'
        }));
        component.methods = map(filter(node.declaration.body.body, m => m.type === 'ClassMethod' && m.key.name !== 'constructor'), m => this.extractMethodDefinition(m));

        const constructorBlock = find(node.declaration.body.body, m => m.type === 'ClassMethod' && m.key.name === 'constructor');
        component.dependencies = this.extractDependencies(constructorBlock);
      }
    });
    return component;
  }

  private extractDependencies(constructorMethod /*ClassBody body[]*/): Dependency[] {
    const dependancies = get(constructorMethod, 'params', []);
    return dependancies.map(dep => {
      return new Dependency({
        name: get(dep, 'parameter.name', dep.name),
        type: get(dep, 'parameter.typeAnnotation.typeAnnotation.typeName.name', get(dep, 'typeAnnotation.typeAnnotation.typeName.name'), 'any'),
        visibility: get(dep, 'accessibility', 'public'),
      });
    });
  }

  private extractMethodDefinition(method /*ClassBody body[]*/): Method {
    return new Method({
      name: method.key.name,
      visibility: method.accessibility || 'public',
      parameters: map(get(method, 'params', []), param => this.getParamValue(param)),
      static: !!method.static,
      returns: this.extractTypeAsString(get(method, 'returnType.typeAnnotation')),
    });
  }

  private extractTypeAsString(paramType /*TSTypeReference*/): string {
    let typeParams = get(paramType, 'typeParameters.params', []);
    if (typeParams.length === 0) {
      return get(paramType, 'typeName.name');
    } else {
      let types = flattenDeep([get(paramType, 'typeName.name'), ...typeParams.map(subType => this.extractTypeAsString(subType))]);
      return types.join('<') + new Array(types.length - 1).fill(undefined).map(() => '>').join('');
    }
  }

  getParamValue(param /*Param*/): Param {
    if (param.type === 'AssignmentPattern') {
      return new Param({
        name: get(param, 'left.name', param.name),
        type: get(param, 'typeAnnotation.typeAnnotation.typeName.name', 'any'),
        value: get(param, 'right.property.name', param.right.name),
        visibility: get(param, 'accessibility', 'public'),
      });
    }

    return new Param({
      name: get(param, 'parameter.name', param.name),
      type: get(param, 'parameter.typeAnnotation.typeAnnotation.typeName.name', get(param, 'typeAnnotation.typeAnnotation.typeName.name'), 'any'),
      value: undefined,
      visibility: get(param, 'accessibility', 'public'),
    });
  }
}
