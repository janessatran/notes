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
exports.SteamedMilk = void 0;
var CondimentDecorator_1 = require("./CondimentDecorator");
var SteamedMilk = /** @class */ (function (_super) {
    __extends(SteamedMilk, _super);
    function SteamedMilk(beverage) {
        var _this = _super.call(this) || this;
        _this.beverage = beverage;
        return _this;
    }
    SteamedMilk.prototype.getDescription = function () {
        return this.beverage.getDescription() + ", Steamed milk";
    };
    SteamedMilk.prototype.cost = function () {
        return this.beverage.cost() + 0.1;
    };
    return SteamedMilk;
}(CondimentDecorator_1.CondimentDecorator));
exports.SteamedMilk = SteamedMilk;
