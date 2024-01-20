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
