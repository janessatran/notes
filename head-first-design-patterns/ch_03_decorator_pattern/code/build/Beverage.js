"use strict";
exports.__esModule = true;
exports.Beverage = void 0;
var Beverage = /** @class */ (function () {
    function Beverage() {
        this.setDescription("Add a description!");
    }
    Beverage.prototype.getDescription = function () {
        return this._description;
    };
    Beverage.prototype.setDescription = function (description) {
        this._description = description;
    };
    return Beverage;
}());
exports.Beverage = Beverage;
