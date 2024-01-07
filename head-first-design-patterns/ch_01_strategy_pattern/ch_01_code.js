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
/**
 * Abstract class for Ducks
 */
var Duck = /** @class */ (function () {
    function Duck() {
    }
    Duck.prototype.performFly = function () {
        this.flyBehavior.fly();
    };
    Duck.prototype.performQuack = function () {
        this.quackBehavior.quack();
    };
    Duck.prototype.swim = function () {
        console.log("All ducks float, even decoys!");
    };
    return Duck;
}());
/**
 * Various Fly Behaviors
 */
var FlyWithWings = /** @class */ (function () {
    function FlyWithWings() {
    }
    FlyWithWings.prototype.fly = function () {
        console.log("I'm flying!");
    };
    return FlyWithWings;
}());
var FlyNoWay = /** @class */ (function () {
    function FlyNoWay() {
    }
    FlyNoWay.prototype.fly = function () {
        console.log("I can't fly!");
    };
    return FlyNoWay;
}());
var FlyRocketPowered = /** @class */ (function () {
    function FlyRocketPowered() {
    }
    FlyRocketPowered.prototype.fly = function () {
        console.log("I'm flying with a rocket!");
    };
    return FlyRocketPowered;
}());
/**
 * Various Quack Behaviors
 */
var Quack = /** @class */ (function () {
    function Quack() {
    }
    Quack.prototype.quack = function () {
        console.log("Quack!!!");
    };
    return Quack;
}());
var MuteQuack = /** @class */ (function () {
    function MuteQuack() {
    }
    MuteQuack.prototype.quack = function () {
        console.log(" << Silence >> ");
    };
    return MuteQuack;
}());
var Squeak = /** @class */ (function () {
    function Squeak() {
    }
    Squeak.prototype.quack = function () {
        console.log("Squeak");
    };
    return Squeak;
}());
/**
 * A Mallard Duck class
 */
var MallardDuck = /** @class */ (function (_super) {
    __extends(MallardDuck, _super);
    function MallardDuck() {
        return _super.call(this) || this;
    }
    MallardDuck.prototype.display = function () {
        console.log("I'm a Mallard Duck!!!");
    };
    return MallardDuck;
}(Duck));
/**
 * A Model Duck class
 */
var ModelDuck = /** @class */ (function (_super) {
    __extends(ModelDuck, _super);
    function ModelDuck() {
        var _this = _super.call(this) || this;
        _this.flyBehavior = new FlyNoWay();
        _this.quackBehavior = new Quack();
        return _this;
    }
    ModelDuck.prototype.display = function () {
        console.log("I'm a model duck!");
    };
    return ModelDuck;
}(Duck));
/**
 * Testing our duck simulator
 */
function createMiniDuckSimulator() {
    var mallard = new MallardDuck();
    mallard.flyBehavior = new FlyWithWings();
    mallard.quackBehavior = new Quack();
    console.log(mallard.display());
    console.log(mallard.performFly());
    console.log(mallard.performQuack());
    var modelDuck = new ModelDuck();
    console.log(modelDuck.display());
    console.log(modelDuck.performFly());
    console.log(modelDuck.performQuack());
}
createMiniDuckSimulator();
