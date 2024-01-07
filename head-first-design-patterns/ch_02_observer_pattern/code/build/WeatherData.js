"use strict";
exports.__esModule = true;
exports.WeatherData = void 0;
var WeatherData = /** @class */ (function () {
    function WeatherData() {
        this._observers = [];
    }
    WeatherData.prototype.getTemperature = function () {
        var temperatureCelsius = Math.random() * (120 - -50) + -50;
        var temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32;
        return temperatureFahrenheit;
    };
    WeatherData.prototype.getHumidity = function () {
        return Math.random() * 100;
    };
    WeatherData.prototype.getPressure = function () {
        return Math.random() * (1100 - 900) + 900;
    };
    WeatherData.prototype.measurementsChanged = function () {
        console.log("Measures changed, notifing observers!");
        this.notifyObservers();
    };
    WeatherData.prototype.getWeatherData = function () {
        return {
            temperature: this.getTemperature(),
            humidity: this.getHumidity(),
            pressure: this.getPressure()
        };
    };
    WeatherData.prototype.addObserver = function (o) {
        this._observers.push(o);
    };
    WeatherData.prototype.removeObserver = function (o) {
        var index = this._observers.indexOf(o);
        if (index !== -1) {
            this._observers.splice(index, 1);
        }
    };
    WeatherData.prototype.notifyObservers = function () {
        this._observers.forEach(function (observer) {
            console.log("Notifying observers!");
            observer.update();
        });
    };
    return WeatherData;
}());
exports.WeatherData = WeatherData;
