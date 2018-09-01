"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines a set of rules for Angelyzer
 */
var RuleEnum;
(function (RuleEnum) {
    RuleEnum[RuleEnum["CORE_MODULE_SHARED_MODULE_PATTERN"] = 'Core module vs SharedModule pattern'] = "CORE_MODULE_SHARED_MODULE_PATTERN";
    RuleEnum[RuleEnum["IMPORT_NON_MODULE"] = 'Element imported is an Angular Module'] = "IMPORT_NON_MODULE";
    RuleEnum[RuleEnum["EXPORT_MEMBERS"] = 'Only Module, Component, Directive, Pipe can be exported'] = "EXPORT_MEMBERS";
    RuleEnum[RuleEnum["ELEMENT_CAN_NOT_BE_PROVIDED"] = 'Element (Component, Module, Directive, Pipe) has nothing to do in providers'] = "ELEMENT_CAN_NOT_BE_PROVIDED";
    RuleEnum[RuleEnum["ELEMENT_CAN_NOT_BE_DECLARED"] = 'Only (Component, Directive, Pipe) can be declared'] = "ELEMENT_CAN_NOT_BE_DECLARED";
    RuleEnum[RuleEnum["PROVIDE_SERVICE_IN_SINGLE_MODULE"] = 'A service must appear in providers of only one module'] = "PROVIDE_SERVICE_IN_SINGLE_MODULE";
    RuleEnum[RuleEnum["COMPONENT_DIRECTIVE_PIPE_IN_SINGLE_MODULE"] = 'A component, directive, pipe must appear in declarations of only one module'] = "COMPONENT_DIRECTIVE_PIPE_IN_SINGLE_MODULE";
    RuleEnum[RuleEnum["MODULE_MULTIPLE_IMPORT_REFACTOR"] = 'A module imported, many times, goes in a SharedModule'] = "MODULE_MULTIPLE_IMPORT_REFACTOR";
    RuleEnum[RuleEnum["NO_VOID_ELEMENT_IN_MODULE_DEFINITION"] = 'A module must not import, export, declare or provide an empty list of element'] = "NO_VOID_ELEMENT_IN_MODULE_DEFINITION";
})(RuleEnum = exports.RuleEnum || (exports.RuleEnum = {}));
