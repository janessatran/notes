"use strict";
exports.__esModule = true;
exports.CurrentConditionsDisplay = void 0;
var CurrentConditionsDisplay = /** @class */ (function () {
    function CurrentConditionsDisplay(wd) {
        this.weatherData = wd;
    }
    CurrentConditionsDisplay.prototype.update = function () {
        this.humidity = this.weatherData.getHumidity();
        this.temperature = this.weatherData.getTemperature();
        this.display();
    };
    CurrentConditionsDisplay.prototype.display = function () {
        console.log("Current conditions: ".concat(this.temperature, " F degrees, ").concat(this.humidity, " % humidity"));
    };
    return CurrentConditionsDisplay;
}());
exports.CurrentConditionsDisplay = CurrentConditionsDisplay;
