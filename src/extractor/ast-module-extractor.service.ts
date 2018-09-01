import {AngularModule} from '../model/angular-module.model';
import fs = require('fs');
import recast = require('recast');


export class ASTModuleExtractorService {

    /**
     * Read an Angular Module fileContent and return AngularModule instance containing Decorator properties
     * @param fileContent
     * @returns {any}
     */
    public extractModule(fileContent: string): AngularModule {

        const ast = this.getAST(fileContent);

        let nodes = ast.program.body;

        for (const node of nodes) {
            if (node.type === 'ExportNamedDeclaration' && node.declaration.type === 'ClassDeclaration') {
                const name = this.extractModuleName(node);
                const decorator = this.extractNgModuleDecorator(node);
                const imports = this.extractImports(decorator, nodes);
                const { declarations, hasVoidDeclaration } = this.extractDeclarations(decorator, nodes);
                const providers = this.extractProviders(decorator, nodes);
                const bootstrap = this.extractBootStrap(decorator);
                const exports = this.extractExports(decorator, nodes);
                return new AngularModule({
                    name, bootstrap, imports, declarations, providers, exports, hasVoidElement: (hasVoidDeclaration)
                });
            }
        }
        return null;

    }

    /**
     * Extracts Abstract Syntax Tree for typescript
     * @param fileContent
     */
    public getAST(fileContent: string) {
        return recast.parse(fileContent, {
            parser: require("typescript-eslint-parser")
        });
    }

    private extractModuleName(node: any /*ExportNamedDeclaration | ClassDeclaration*/): string {
        return node.declaration.id.name;
    }

    private extractNgModuleDecorator(node: any /*ExportNamedDeclaration | ClassDeclaration*/)/*ObjectExpression*/ {
        for (const decorator of node.declaration.decorators) {
            if (decorator.expression.callee.name === 'NgModule') {
                return decorator.expression.arguments[0];
            }
        }
    }

    /**
     * Extracts Imports or Exports from a NgModule decorator.
     *
     * Imports or Exports are simple strings arrays.
     *
     * @param decorator
     * @param programBody
     * @param type
     * @returns {Array}
     */
    private extractImportsExports(decorator: any, programBody: any, type: string = 'imports'): string[] {
        const result = [];

        for (const property of decorator.properties) {
            if (property.key.name === type) {
                if (property.value.type === 'Identifier') {
                    const values = this.extractVariableValues(programBody, property.value.name);
                    result.push(...values);
                } else {
                    for (const element of property.value.elements) {
                        switch (element.type) {
                            case 'Identifier': {
                                result.push(element.name);
                                break;
                            }
                            case 'CallExpression': {
                                result.push(element.callee.object.name);
                                break;
                            }
                            case 'SpreadElement': {
                                const values = this.extractVariableValues(programBody, element.argument.name);
                                result.push(...values);
                                break;
                            }
                            default: {
                                console.log('Can not find ' + type, element.type);
                            }
                        }
                    }
                }
            }
        }

        return result;
    }

    private extractExports(decorator: any, programBody: any): string[] {
        return this.extractImportsExports(decorator, programBody, 'exports');
    }

    private extractImports(ngModuleDecorator: any, programBody: any): string[] {
        return this.extractImportsExports(ngModuleDecorator, programBody, 'imports');
    }

    /**
     * Extract providers from NgModule decorator
     * @param decorator
     * @param programBody
     * @returns {Array}
     */
    private extractProviders(decorator: any, programBody: any): string[] {
        const providers = [];
        for (const property of decorator.properties) {
            if (property.key.name === 'providers') {
                for (const element of property.value.elements) {
                    switch (element.type) {
                        case 'Identifier': {
                            providers.push(element.name);
                            break;
                        }
                        case 'ObjectExpression': {
                            if (element.properties[1].key.name === 'useValue') {
                                providers.push(element.properties[0].value.name);
                            }
                            if (element.properties[1].key.name === 'useClass') {
                                providers.push(element.properties[1].value.name);
                            }
                            // todo: handle useFactory, useExisting
                            break;
                        }
                        case 'CallExpression': {
                            providers.push(element.callee.object.name);
                            break;
                        }
                        case 'SpreadElement': {
                            const values = this.extractVariableValues(programBody, element.argument.name);
                            providers.push(...values);
                            break;
                        }
                        default: {
                            console.log('Providers analyzing, can not find Identifier ', element.type);
                        }
                    }
                }
            }
        }
        return providers;
    }

    /**
     * Extract declarations from NgModule decorator
     * @param decorator
     * @param programBody
     * @returns {Array}
     */
    private extractDeclarations(decorator: any, programBody: any): {declarations: string[], hasVoidDeclaration: boolean} {
        const declarations = [];
        let hasVoidDeclaration = false;
        for (const property of decorator.properties) {
            if (property.key.name === 'declarations') {
                if (!property.value.elements) {
                    hasVoidDeclaration = true;
                    continue;
                }
                for (const element of property.value.elements) {
                    switch (element.type) {
                        case 'Identifier': {
                            declarations.push(element.name);
                            break;
                        }
                        case 'SpreadElement': {
                            const values = this.extractVariableValues(programBody, element.argument.name);
                            declarations.push(...values);
                            break;
                        }
                        default: {
                            console.log('Declarations analyzing, Can not find Identifier ', element.type);
                        }
                    }
                }
            }
        }
        return {declarations, hasVoidDeclaration};
    }

    /**
     * Extract bootstrap properties form NgModule decorator
     * @param decorator
     * @returns {Array}
     */
    private extractBootStrap(decorator: any): string[] {
        const bootstrap = [];
        for (const property of decorator.properties) {
            if (property.key.name === 'bootstrap') {
                for (const element of property.value.elements) {
                    switch (element.type) {
                        case 'Identifier': {
                            bootstrap.push(element.name);
                            break;
                        }
                        default: {
                            console.log('Bootstrap analyzing, Can not find bootstrap ', element.type);
                        }
                    }
                }
            }
        }
        return bootstrap;
    }

    /**
     * Scan programBody for given varName and return corresponding value
     * @param programBody
     * @param varName
     * @returns {Array}
     */
    private extractVariableValues(programBody: any, varName: string): string[] {
        const values = [];
        for (const node of programBody) {
            if (node.type === 'VariableDeclaration') {
                if (node.declarations[0].id && node.declarations[0].id.name === varName) {
                    for (const val of node.declarations[0].init.elements) {
                        if (val.type === 'ObjectExpression') {
                            if (val.properties[1].key.name === 'useValue') {
                                values.push(val.properties[0].value.name);
                            }
                            if (val.properties[1].key.name === 'useClass') {
                                values.push(val.properties[1].value.name);
                            }
                            // todo: handle useFactory, useExisting
                        } else { // cas Identifier
                            values.push(val.name);
                        }
                    }
                    return values;
                }
            }
        }
        return values;
    }
}