import { IObservable } from "./IObservable";
import { IObserver } from "./IObserver";

export class WeatherData implements IObservable {
  private _observers: IObserver[];

  constructor() {
    this._observers = [];
  }

  getTemperature() {
    const temperatureCelsius = Math.random() * (120 - -50) + -50;
    const temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32;
    return temperatureFahrenheit;
  }

  getHumidity() {
    return Math.random() * 100;
  }

  getPressure() {
    return Math.random() * (1100 - 900) + 900;
  }

  measurementsChanged() {
    console.log("Measures changed, notifing observers!");
    this.notifyObservers();
  }

  getWeatherData() {
    return {
      temperature: this.getTemperature(),
      humidity: this.getHumidity(),
      pressure: this.getPressure(),
    };
  }

  addObserver(o: IObserver): void {
    this._observers.push(o);
  }

  removeObserver(o: IObserver): void {
    const index = this._observers.indexOf(o);
    if (index !== -1) {
      this._observers.splice(index, 1);
    }
  }

  notifyObservers(): void {
    this._observers.forEach((observer) => {
      console.log("Notifying observers!");
      observer.update();
    });
  }
}
