import { IDisplayElement } from "./IDisplayElement";
import { IObserver } from "./IObserver";
import { WeatherData } from "./WeatherData";

export class CurrentConditionsDisplay implements IObserver, IDisplayElement {
  protected humidity: number;
  protected temperature: number;
  protected weatherData: WeatherData;

  constructor(wd: WeatherData) {
    this.weatherData = wd;
  }

  update(): void {
    this.humidity = this.weatherData.getHumidity();
    this.temperature = this.weatherData.getTemperature();
    this.display();
  }

  display() {
    console.log(
      `Current conditions: ${this.temperature} F degrees, ${this.humidity} % humidity`
    );
  }
}
