"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Property = /** @class */ (function () {
    function Property(obj) {
        this.static = false;
        this.readonly = false;
        Object.assign(this, obj);
    }
    return Property;
}());
exports.Property = Property;
var Method = /** @class */ (function () {
    function Method(method) {
        this.static = false;
        Object.assign(this, method);
    }
    return Method;
}());
exports.Method = Method;
var Param = /** @class */ (function () {
    function Param(param) {
        Object.assign(this, param);
    }
    return Param;
}());
exports.Param = Param;
var Input = /** @class */ (function () {
    function Input(input) {
        Object.assign(this, input);
    }
    return Input;
}());
exports.Input = Input;
var Output = /** @class */ (function () {
    function Output(output) {
        Object.assign(this, output);
    }
    return Output;
}());
exports.Output = Output;
var Dependency = /** @class */ (function () {
    function Dependency(dep) {
        Object.assign(this, dep);
    }
    return Dependency;
}());
exports.Dependency = Dependency;
var AngularComponent = /** @class */ (function () {
    function AngularComponent() {
        this.implements = [];
    }
    return AngularComponent;
}());
exports.AngularComponent = AngularComponent;
