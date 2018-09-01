/**
 * Defines a set of rules for Angelyzer
 */
export enum RuleEnum {
  CORE_MODULE_SHARED_MODULE_PATTERN = <any> 'Core module vs SharedModule pattern',
  IMPORT_NON_MODULE = <any> 'Element imported is an Angular Module',
  EXPORT_MEMBERS = <any> 'Only Module, Component, Directive, Pipe can be exported',
  ELEMENT_CAN_NOT_BE_PROVIDED = <any> 'Element (Component, Module, Directive, Pipe) has nothing to do in providers',
  ELEMENT_CAN_NOT_BE_DECLARED = <any> 'Only (Component, Directive, Pipe) can be declared',
  PROVIDE_SERVICE_IN_SINGLE_MODULE = <any> 'A service must appear in providers of only one module',
  COMPONENT_DIRECTIVE_PIPE_IN_SINGLE_MODULE = <any> 'A component, directive, pipe must appear in declarations of only one module',
  MODULE_MULTIPLE_IMPORT_REFACTOR = <any> 'A module imported, many times, goes in a SharedModule',
  NO_VOID_ELEMENT_IN_MODULE_DEFINITION = <any> 'A module must not import, export, declare or provide an empty list of element',
}