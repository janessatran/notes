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

> 💡 The Factory Method Pattern defines an interface for creating an object, but lets subclasses decide which class to instantiate. Factory method lets a class defer instantiation to subclasses.

#### The Dependency Inversion Principle

Depend upon abstractions. Do not depend upon concrete classes. Our high-level components should not depend on our low-level components, rather, they should both depend on abstractions.

- A "high-level" component is a class with behavior defined in terms of other, "low-level" components.
- For example, `PizzaStore` is a high-level component because its behavior is defined in terms of pizzas- it creates all different pizza objects, and prepares, bakes, cuts, and boxes them, while the pizzas it uses are low-level components.

The "inversion" in the name Depenedency Inversion Principle is there because it inverts the way you typically might think about OO design. Instead of a top-to-bottom dependency chart, both high-level and low-level modules now depend on the abstraction.

##### Guidelines to help you follow the Dependency Inversion Principle

- No variable shouod hold a reference to a concrete class
- No class should derive from a concrete class
- No method should override an implemented method of any of its base classes

#### Building Ingredient Factories

Objectville wants to start shipping out ingredients to ensure each pizza shop is using the highest quality ingredients. Each franchise has different ingredients depending on the style of pizza (NY Cheese Pizza uses Reggiano while Chicago Cheese Pizza uses Mozzerlla and Parmesan...). In order to facilitate the shipment of ingredients to each family, while allowing for the flexibility of each franchise potentially having different types of ingredients we can create a factory to encapsulate the family of ingredients.

For each ingredient ed dfine a create method in our interface.

```java
public interface PizzaIngredientFactory {
  public Dough createDough();
  public Sauce createSuace();
  public Cheese createCheese();
  public Veggies[] createVeggies();
  public Pepperoni createPepperoni();
  public Clams createClams();
}
```

With this interface, we will:

1. Build a factory for each region by creating a subclass of `PizzaIngredientFactory` that implements each create method.
2. Implement a set of ingredient classes to use with each factory, like `ReggianoCheese`, `RedPeppers`, `ThickCrustDough`, etc.
3. Hook up the new ingredients facctories into our old `PizzaStore` code.

Here's an example of our New York ingredient factory.

```java
public class NYPizzaIngredientFactory implements PizzaIngredientFactory {
  public Dough createDough() {
    return new ThinCrustDough();
  }

  public Sauce createSuace() {
    return new MarinaraSauce();
  }

  public Cheese createCheese() {
    return new ReggianoCheese();
  }

  public Veggies[] createVeggies() {
    Veggies veggies[]  = { new Garlic(), new Onion(), new Mushrooms() };
    return veggies;
  }

  public Pepperoni createPepperoni() {
    return new SlicedPepperoni();
  }

  public Clams createClams() {
    return new FreshClams();
  }

}
```

Refactoring out Pizza product to include ingredients from the factory:

```java
public abstract class Pizza {
  String name;

  Dough dough;
  Sauce sauce;
  Veggies veggies;
  Cheese cheese;
  Pepperoni pepperoni;
  Clams clams;

  /*
    This method is where we will collect the ingredients
    needed for the pizza, which will come from the ingredient
    factory.
  */
  abstract void prepare();

  void bake() {
    System.out.println("Bake for 25 minutes at 250");
  }

  ...
}

```

And now, time to re-work our concrete implementations of the products.

```java
public class CheesePizza extends Pizza {
  PizzaIngredientsFactory ingredienttsFactory;

  public CheesePizza(PizzaIngredientFactory: ingredientFactory) {
    this.ingredientFactory = ingredientFactory;
  }

  void prepare() {
    dough = ingredientFactory.createDough();
    sauce = ingredientFactory.createSauce();
    cheese = ingredientFactory.createCheese();
  }
}

```

- The Pizza code uses the factory it has been composed with to produce the ingredients used in the pizza.
- The ingredients depend on which factory we're using
  This decouples the differences in regional ingredients and can be easily re-used when the ingredient factorie are for Austin, Nashville, etc.

Finally, to put this all together with out Pizza Store implementations:

```java
public class NYPizzaStore extends PizzaStore {
  protected Pizza createPizza(String item) {
    Pizza pizza = null;
    PizzaIngredientsFactory ingredientFactory = new NYPizzaIngredientFactory();


    if (item.equals("cheese")) {
      pizza = new CheesePizza(ingredientsFactory);
      pizza.setName("New York Style Cheese Pizza");
    } else if (item.equals("Veggie")) {
      pizza = new VeggiePizza(ingredientsFactory);
      pizza.setName("New York Style Veggie Pizza");
    }

    // other pizza types would go

    return pizza;
  }
}
```

### Abstract Factory Pattern

> 💡 The Abstract Factory Pattern provides an interface for creating families of related or dependents objects without specifying their concrete classes.

The Factory Method ad Abstract Factory Pattern are both similiar in that they help decouple applications from specific implemenations, but they do it in different ways.

- Abstract factory: creates objects through object composition and provides an abstract type for creating a family of products.
  - Use this whenever you have a family of products you need to create and you want to make sure your client create products that belong together.
  - In our Pizza stores example, we create an Abstract Factory for `PizzaIngredientsFactory` because we need an abstract interface for creating a family of products (cheese, sauce, dough, veggies, etc).
- Factory method: creates objects through inheritance (extend a class and provide an implementaiton for a factory method which creates objects)
  - Use this to decouple your client code from the concrete classes you need to instantiate, or if you don't know ahead of time all the concrete classes you are going to need.
  - In our Pizza Stores example, we create `PizzaStore` using a Factory Method implementation because we just need an abstract interface for a single product (the product is `Pizza` and the factory method is `createPizza`).

## Summary

**OO Principles** we learned in this chapter:

- Depend on abstractions. Do not depend on concrete classes.

**Abstract Factory**: Provides an interface for creating families of related or dependent objects without specifying their concrete classes.

**Factory method**: Defines an interface for creating an object, but lets sublcasses decide which class to instantiate. Factory Methods lets a class defer instantiation to the subclasses.

- All factories encapsulate object creation.
- Simple Factory is a simple way to decouple your clients from concrete classes.
- Factory Method relies on inheritance: object creation is delegated to subclasses, which implement the factory method to create objects.
- Abstract Factory relies on object composition: object creationis implemented in methods exposed in the factory interface.
- All factory patterns promote loose coupling by reducing the dependnecy of your application on concrete classes.
- The intent of Factory Method is to allow a class to defer instantiation to its sublcasses.
- The intent of Abstract Factory is to create families of related objects without having to depend on their concrete classes.
- THe Dependency Inversion Principle guides us to avoid dependnecies on concrete types and to strive for abstractions.
- Factories are a powerful technique for coding to abstractions, not concrete classes.

<hr>

### Using the Factory Method Design Pattern in Web Applications

The factory method design pattern can be used in web apps to create objects that depend on context, user input, or configuration.
For example, you might use it to create different types of web pages or components based on the request params, user preferences, or device capabilities.

Example:

- You have a `Webpage` interface which includes a definition for the `render()` function
- You have an abstract class `WebPageFactory` that is the creator class declaring a factory method `createWebPage()`, which r4e4turns a `Webpage`
- Then, you have concrete product classes such as `HomePage` and `AboutPage` which both implement `Webpage` to define `render()`
- Finally, you have a concrete creator class `LibraryApp` which implements the abstract class `WebPageFactory` and implements the factory method `createWebPage()` to return a new `HomePage` or `AboutPage` depending on the request URL

#### Factories in JS

A factory function is any function which is not a class or constructor that returns a (presumably new) object. In JavaScript, any function can return an object. When it does so without the new keyword, it’s a factory function.

```javascript
const createUser = ({ userName, avatar }) => ({
  userName,
  avatar,
  setUserName(userName) {
    this.userName = userName;
    return this;
  },
});

console.log(createUser({ userName: "echo", avatar: "echo.png" }));
/*
{
  "avatar": "echo.png",
  "userName": "echo",
  "setUserName": [Function setUserName]
}
*/
```

### Advantages of the Factory Pattern

- **Re-use**: if you want to instantiate an object in many , you don't have to repeat the condition that determines which object gets created, so when you need to add a new type the mix, you don't run the risk of missing one.
- **Unit-testability**: You can write fewer tests on the calling classes to ensure the factory returns the correct type of object.
- **Extensibility**: when someone wants to add a new class to this factory, none of the calling code, nor unit tests, need to be told. (Open-closed principle).
