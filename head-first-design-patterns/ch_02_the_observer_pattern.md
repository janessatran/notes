## Chapter 2. Keeping your Objects in the Know: The Observer Pattern

We are working on a Weathering Monitoring application that has three components:

1. The weather station (physical device that acquires actual weather data).
2. The `WeatherData` object (tracks data coming from the Weather Station and updates the displays).
3. The display that shows users the current weather conditions.

The company Weather-O-Rama wants to allow other developers to write their own weather displays. The `WeatherData` object tracks current weather conditions such as temperature, humidity, and barometric pressure.

**Task**: We need to create an app using `WeatherData` to update the three displays for current conditions, weather stats, and a forecast

Starting Point: The `WeatherData` class has the following methods:

- `getTemperature()`: Data comes from the Weather Station.
- `getHumidity()`: Data comes from the Weather Station.
- `getPressure()`: Data comes from the Weather Station.
- `measurementsChanged()`: This method gets called whenever the weather measures have been updated.

ToDo:

- Implement three display elements that use weather data. A current conditions display, a statistics display, and a forecast display.
- Update the display with `measurementsChanged()` method.
- Implement solution so that is' expandable and enables other developers to create their own custom displays.

First Implementation:

```java
public class WeatherData {

  // instance variable declarations

  public void measurementsChanged() {
    float temp = getTemperature();
    float humidity = getHumidity();
    float pressure = getPressure();

    currentConditionsDisplay.update(temp, humidity, pressure);
    statisticsDisplay.update(temp, humidity, pressure);
    forecastDisplay.update(temp, humidity, pressure);
  }

  // other WeatherData methods here
}
```

Based on this first implementation, which of the following apply? (my answers)

- We are coding to concrete implementations, not interfaces.
- For every new display, we'll need to alter this code.
- We haven't encapuslated the part that changes.

> 💡 Observer Pattern - Defines a one-to-many dependency between objects so that when one object changes state, all of its dependents are notified and updated automically.

In our example, the subject is the Weather Station and the observers are the different displays.

- the one-to-many relationship is seen in the ONE subject and MANY observers
- depenedence is demonstrated in the observers depending on the subject to update them when the data changes

#### The Observer Pattern: Subject and Observer Classes

One way to implement the Observer pattern is to have a `Subject` interface that objects use register as observers and remove themselves as observers. Each subject can have many observers.

| Subject (interface) |
| ------------------- |
| registerObserver()  |
| removeObserver()    |
| notifyObservers()   |

Following this, we'd also have an `Observer` interface that all potential observers implement. It has an `update()` method that is called when the Subject's state changes.

| Observer (interface) |
| -------------------- |
| update()             |

#### The Power of Loose Coupling

When two objects are loosely coupled, they interact but have very little knowledge of each other. The Observer Pattern is a great example of loose coupling.

- The only thing the subject knows about the observer is that it implements a certain interface (the `Observer` interface)
- We can add new observers at any time. This is because the only thing the subject depends on is a list of objects that implement the `Observer` interface
- We never need to modify the subject to add new types of observers
- We can reuse subjects of observers independently of each other (we're free to use a subject or observer for other uses if we'd like)
- Changes to either the subject or an observer will not affect the other.

> 💡 Design Principle: Strive for loosely coupled designs between objects that interact. Loosely coupled designs allow us to build flexible OO systems that can handle change because they minimize the interdependency between objects.

##### Exercise!

📝 Try sketching out the classes you'll need to implement the Weather Station, including the WeatherData class and its display elements.

Note: I'm doing this in TS since that's what I'm more familiar with at the moment.

```typescript

interface Subject {
  registerObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(); void;
}

interface Observer {
  update(data: any): void;
}

class WeatherData implements Subject {
  private observers: Observer[] = [];

  registerObserver(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  getTemperature() {
    // ...
  }

  getHumidity() {
    // ...
  }

  getPressure() {
    // ...
  }

  measurementsChanged() {
    notifyObservers();
  }

  getWeatherData() {
    returns {
      temperature: getTemperature(),
      humidity: getHumidity(),
      pressure: getPressure()
    }
  }

  notifyObservers(): void {
    const data = getWeatherData();
    this.observers.forEach(observer => {
      observer.update(data);
    })
  }
}

class CurrentConditionsDisplay implements Observer {
  update(data: any): void {
    console.log("Updating current conditions display!", data);
  }
}

class StatisticsDisplay implements Observer {
  update(data: any): void {
    console.log("Updating statistics display!", data);
  }
}

class ForecastDisplay implements Observer {
  update(data: any): void {
    console.log("Updating forecast display!", data);
  }
}

const weatherData = new WeatherData();
const currentConditionsDisplay = new CurrentCOnditionsDisplay();
const statsDisplay = new StatisticsDisplay();
const forecastDisplay = new ForecastDisplay();

// register observers
weatherData.registerObserver(currentConditionsDisplay);
weatherData.registerObserver(statsDisplay);
weatherData.registerObserver(forecastDisplay);


// notify observers
weatherData.notifyObservers();

// remove observer
weatherData.removeObserver(forecastDisplay);

```