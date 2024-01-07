"use strict";
/**
 * Weather-O-Rama has hired us to build an application that displays
 * the current weather conditions, statistics for the weather,
 * and a forecast of the weather.
 *
 * We've built this application to be extensible for other custom
 * displays made by external developers by leveraging the Observer Pattern.
 */
exports.__esModule = true;
// to compile: tsc code/index.ts --outDir code/build
var CurrentConditionDisplay_1 = require("./CurrentConditionDisplay");
var WeatherData_1 = require("./WeatherData");
var wd = new WeatherData_1.WeatherData();
var currentConditions = new CurrentConditionDisplay_1.CurrentConditionsDisplay(wd);
// Add observer to our observable/subject
wd.addObserver(currentConditions);
// Simulate weather data changes
wd.measurementsChanged();
