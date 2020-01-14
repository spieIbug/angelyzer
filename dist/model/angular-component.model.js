"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Dependency = /** @class */ (function () {
    function Dependency(dep) {
        Object.assign(this, dep);
    }
    return Dependency;
}());
exports.Dependency = Dependency;
var TSClass = /** @class */ (function () {
    function TSClass(clazz) {
        this.implements = [];
        Object.assign(this, clazz);
    }
    return TSClass;
}());
exports.TSClass = TSClass;
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
var AngularComponent = /** @class */ (function (_super) {
    __extends(AngularComponent, _super);
    function AngularComponent(clazz, inputs, outputs) {
        var _this = _super.call(this, clazz) || this;
        _this.inputs = inputs;
        _this.outputs = outputs;
        return _this;
    }
    return AngularComponent;
}(TSClass));
exports.AngularComponent = AngularComponent;
