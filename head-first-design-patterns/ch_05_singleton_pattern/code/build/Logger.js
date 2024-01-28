"use strict";
exports.__esModule = true;
exports.Logger = void 0;
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.getInstance = function () {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    };
    Logger.prototype.configure = function (_a) {
        var enableLogging = _a.enableLogging;
        this.enabledLogging = enableLogging;
    };
    Logger.prototype.configCheck = function () {
        console.log("Is logging enabled?", this.enabledLogging);
    };
    return Logger;
}());
exports.Logger = Logger;
