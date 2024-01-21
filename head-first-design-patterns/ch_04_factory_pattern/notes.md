## Chapter 4. Baking with OO Goodness: The Factory Pattern

Using the **new** operator is programming to an implementation (not an interface) because we're instantiating a concrete class.

_Why do we want to code to an interface?_
Because it will make your code more flexible by allowing your code to work with any new classes implementing that interface through polymorphism.

Coding to a concrete class makes code more fragile and less flexible.

_Why?_
If you have code that uses a lot of concrete classes, that code might need to change if new concrete clases are added. This violates the "closed for modification" principle. To extend your code with new concrete types, you'll have to reopen it.

Here's an example of something to avoid. We have a whole set of related concrete classes that we don't know until runtime which one we need to instantiate.

```java
Duck duck;

if (picnic) {
  duck = new MallardDuck();
} else if (hunting) {
  duck = new DecoryDuck();
} else if (inBathTub) {
  duck = new RubberDuck();
}

```

## Encapsulating object creation

An object that is responsible for object creation is called a **factory**. The example in this chapter relays creating a program to create Pizzas. There are a lot of different varieties of pizza served at this restaurant and sometimes the menu changes. It's a pain to have to refactor the conditionals every time the menu changes. As a solution to this issue, we can pull out the code that relates to instantiating the different pizzas. This is encapsulating what varies!

```java
public class SimplePizzaFactory {
  public Pizza createPizza(String type) {
    Pizza pizza = null;

    if (type.equals("cheese")) {
      pizza = new CheesePizza();
    } else if (type.equals("pepperoni")) {
      pizza = new PepperoniPizza();
    } else if (type.equals("clam")) {
      pizza = new ClamPizza();
    } else if (type.equals("veggie")) {
      pizza = new VeggiePizza();
    }
  }
}

```

```java
public class PizzaStore {
  SimplePizzaFactory factory;

  public PizzaStore(SimplePizzaFactory factory) {
    this.factory = factory;
  }

  public Pizza orderPizza(String type) {
    Pizza pizza;

    pizza = factory.createPizza(type);
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }
}

```

Whats the advantage of having a factory class?

- By encapsulating the creation in one class, you only have to make modifications in one place when the implementation changes.

### Franchising the pizza store

The pizza store is doing well so franchise operations open. Now we have a variety of pizza styles to sell at each franchise depehnding on the region:

- New York `NYPizzaFactory`
- Chicago `ChicagoPizzaFactory`
- California `CaliforniaPizzaFactory`

One approach to updating the software to accomdate for this is to swap out `SimplePizzaFactory` and create three different factories.

```java
NYPizzaFactory nyFactory = new NYPizzaFactory();
PizzaStore nyStore = new PizzaStore(myFactory);
nyStore.orderPizza("Veggie");

ChicagoPizzaFactory chicagoFactory = new ChicagoPizzaFactory();
PizzaStore chicagoStore = new PizzaStore(chicagoFactory);
chicagoStore.orderPizza("Veggie");

```

A better way to approach this would be to localize all pizza-making activities to the PizzaStore class, and to give the franchises freedom to have their own regional style.

Create an abstract method `createPizza()` in the `PizzaStore` class, and create a `PizzaStore` subclass for each regional style.

```java
public class PizzaStore {
  SimplePizzaFactory factory;

  public PizzaStore(SimplePizzaFactory factory) {
    this.factory = factory;
  }

  public Pizza orderPizza(String type) {
    Pizza pizza;

    pizza = factory.createPizza(type);
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }

  abstract Pizza createPizza(string type);
}

```

```java
public class NYPizzaStore extends PizzaStore {
  Pizza createPizza(String item) {
    if (item.equals("cheese")) {
      return new NYStyleCheesePizza();
    } else if (item.equals("veggie")) {
      return new NYStyleVeggiePizza();
    }
  }
}


```

A **factory method** handles object creation and encapsulates it in a subclass. This decouples the client code in the superclas from the object creation code in the subclass.

> 💡 The Factory Method Pattern defines an interface for cr4eating an object, but lets subclasses decide which class to instantiate. Factory method lets a class defer instantiation to subclasses.

#### The Dependency Inversion Principle

Depend upon abstractions. Do not depend upon concrete classes. Our high-level components should not depend on our low-level components, rather, they should both depend on abstractions.

- A "high-level" component is a class with behavior defined in terms of other, "low-level" components.
- For example, `PizzaStore` is a high-level component because its behavior is defined in terms of pizzas- it creates all different pizza objects, and prepares, bakes, cuts, and boxes them, while the pizzas it uses are low-level components.

The "inversion" in the name Depenedency Inversion Principle is there because it inverts the way you typically might think about OO design. Instead of a top-to-bottom dependency chart, both high-level and low-level modules now depend on the abstraction.

##### Guidelines to help you follow the Dependency Inversion Principle

- No variable shouod hold a reference to a concrete class
- No class should derive from a concrete class
- No method should override an implemented method of any of its base classes

### Using the Factory Method Design Pattern in Web Applications

The factory method design pattern can be used in web apps to create objects that depend on context, user input, or configuration.
For example, you might use it to create different types of web pages or components based on the request params, user preferences, or device capabilities.

Example:

- You have a `Webpage` interface which includes a definition for the `render()` function
- You have an abstract class `WebPageFactory` that is the creator class declaring a factory method `createWebPage()`, which r4e4turns a `Webpage`
- Then, you have concrete product classes such as `HomePage` and `AboutPage` which both implement `Webpage` to define `render()`
- Finally, you have a concrete creator class `LibraryApp` which implements the abstract class `WebPageFactory` and implements the factory method `createWebPage()` to return a new `HomePage` or `AboutPage` depending on the request URL
