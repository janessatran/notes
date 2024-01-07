/**
 * Weather-O-Rama has hired us to build an application that displays
 * the current weather conditions, statistics for the weather,
 * and a forecast of the weather.
 *
 * We've built this application to be extensible for other custom
 * displays made by external developers by leveraging the Observer Pattern.
 */

// to compile: tsc code/index.ts --outDir code/build
import { CurrentConditionsDisplay } from "./CurrentConditionDisplay";
import { WeatherData } from "./WeatherData";

const wd = new WeatherData();
const currentConditions = new CurrentConditionsDisplay(wd);

// Add observer to our observable/subject
wd.addObserver(currentConditions);

// Simulate weather data changes
wd.measurementsChanged();
