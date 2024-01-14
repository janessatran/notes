"use strict";
exports.__esModule = true;
exports.Beverage = exports.Size = void 0;
var Size;
(function (Size) {
    Size["Tall"] = "Tall";
    Size["Grande"] = "Grande";
    Size["Venti"] = "Venti";
})(Size = exports.Size || (exports.Size = {}));
var Beverage = /** @class */ (function () {
    function Beverage() {
        this.setDescription("Add a description!");
        this.setSize(Size.Tall);
    }
    Beverage.prototype.getDescription = function () {
        return this._description;
    };
    Beverage.prototype.setDescription = function (description) {
        this._description = description;
    };
    Beverage.prototype.setSize = function (size) {
        this._size = size;
    };
    Beverage.prototype.getSize = function () {
        return this._size;
    };
    return Beverage;
}());
exports.Beverage = Beverage;
