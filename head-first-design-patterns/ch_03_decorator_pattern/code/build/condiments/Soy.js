"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Soy = void 0;
var Beverage_1 = require("../coffees/Beverage");
var CondimentDecorator_1 = require("./CondimentDecorator");
var Soy = /** @class */ (function (_super) {
    __extends(Soy, _super);
    function Soy(beverage) {
        var _this = _super.call(this) || this;
        _this.beverage = beverage;
        _this.setSize(beverage.getSize());
        return _this;
    }
    Soy.prototype.getDescription = function () {
        return this.beverage.getDescription() + ", Soy";
    };
    Soy.prototype.cost = function () {
        var size = this.beverage.getSize();
        var additionalCost;
        switch (size) {
            case Beverage_1.Size.Tall:
                additionalCost = 0.1;
                break;
            case Beverage_1.Size.Grande:
                additionalCost = 0.15;
                break;
            case Beverage_1.Size.Venti:
                additionalCost = 0.2;
                break;
        }
        return this.beverage.cost() + additionalCost;
    };
    return Soy;
}(CondimentDecorator_1.CondimentDecorator));
exports.Soy = Soy;
