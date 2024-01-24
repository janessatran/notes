/**
 * Here's an example of using the Factory Method Design Pattern in Web Development.
 * This pattern allows us to move object construction to a special
 * method known as the factory method. The factory method
 * is responsible for construction of the desired object(s).
 *
 * Let's say we have a web app and it accepts different types of payments.
 * We can create a payment factory which handles the various payment methods
 * depending on the payment gateway type.
 *
 * To compile and run this code, cd into the code directory and run the following:
 * tsc ./index.ts --outDir ./build && node ./build/index.js
 */
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
 * Creator class. Contains the factory method, which returns
 * an object of the same type as our product interface.
 *
 * The Creator is typically an abstract class that defines
 * an abstract factory method.
 */
var PaymentPortal = /** @class */ (function () {
    function PaymentPortal() {
    }
    PaymentPortal.prototype.processPayment = function (amount) {
        var paymentGateway = this.createPaymentGateway();
        paymentGateway.processPayment(amount);
    };
    return PaymentPortal;
}());
/**
 * Concrete Creator - USPaymentPortal
 */
var USPaymentPortal = /** @class */ (function (_super) {
    __extends(USPaymentPortal, _super);
    function USPaymentPortal() {
        return _super.call(this) || this;
    }
    USPaymentPortal.prototype.createPaymentGateway = function () {
        return new USPaymentGateway();
    };
    return USPaymentPortal;
}(PaymentPortal));
/**
 * Concrete Product - USPaymentGateway
 */
var USPaymentGateway = /** @class */ (function () {
    function USPaymentGateway() {
        this.currencyCode = "USD";
    }
    USPaymentGateway.prototype.processPayment = function (amount) {
        console.log("Processing payment of $".concat(amount, " in ").concat(this.currencyCode));
    };
    return USPaymentGateway;
}());
/**
 * Concrete Creator - VietnamPaymentPortal
 */
var VNDPaymentPortal = /** @class */ (function (_super) {
    __extends(VNDPaymentPortal, _super);
    function VNDPaymentPortal() {
        return _super.call(this) || this;
    }
    VNDPaymentPortal.prototype.createPaymentGateway = function () {
        return new VNDPaymentGateway();
    };
    return VNDPaymentPortal;
}(PaymentPortal));
/**
 * Concrete Product - VNDPaymentGateway
 */
var VNDPaymentGateway = /** @class */ (function () {
    function VNDPaymentGateway() {
        this.currencyCode = "VND";
    }
    VNDPaymentGateway.prototype.processPayment = function (amount) {
        console.log("Processing payment of $".concat(amount, " in ").concat(this.currencyCode));
    };
    return VNDPaymentGateway;
}());
// Client code
var usPaymentPortal = new USPaymentPortal();
// Using the factory to create US payment gateway
var usPaymentGateway = usPaymentPortal.createPaymentGateway();
console.log(usPaymentGateway.processPayment(100));
var vndPaymentPortal = new VNDPaymentPortal();
// Using the factory to create Vietnam payment gateway
var vndPaymentGateway = vndPaymentPortal.createPaymentGateway();
console.log(vndPaymentGateway.processPayment(100));
