## Chapter 1. Welcome to Design Patterns: Intro to Design Patterns

Using design patterns is applying the widsom and lessons learned by other developers who've been down the same design problems road before and survived the trip.

Someone has already solved your problems!

#### The Problem

There is a `SimUIDuck` app which is a simulator for ducks. There was a last-minute request made by executives to enable the ducks to fly. The engineering manager said this feature request could be completed within the week, so the developer rushed to implement this behavior by adding a `fly()` method to the `Duck` class. He didn't realize this would enable _all_ ducks to fly, including those that shouldn't! This caused the rubber ducks to fly during the demo. Yikes!

Disadvantages to using inheritance to provide `Duck` behavior?

My answers:

- Runtime behavior changes are difficult
- Changes can unintentionally affect other ducks

The one thing you can always count on in software developent is _change_.

Some reasons code changes are required in applications include:

- My customers or users decide they want somethign else, or they want new functionality.
- My company decided it is going with another database vendor and it is also purchasing its data from another supplier that uses a different data format. Argh!
- [my answer] the tech stack changes
- [my answer] a dependency is no longer available or sufficient

> 💡 Design Principle: Identify the aspects of your application that vary and separate them from what stays the same.

For `SimUIDuck`, take what varies and encapsulate it so it won't affect the rest of the code.

Parts that vary/change with Ducks:

- `fly()` functionality
- `quack()` functionality

Since we've identified these parts, we can pull them out of the `Duck` class and create a new set of classes to represent each behavior.

Design Spec:

```
Duck class (superclass of all ducks)
- Includes setter methods for behaviors to enable changing the flying or quacking behavior at runtime

Duck Behaviors:
- Flying Behaviors (interface): All flying classes implement the `fly()` method
  - FlyWithWings (class)
  - FlyNoWay (class)
- Quacking Behaviors (interface): All quacking classes implement the `quack()` method
  - Quack (class)
  - Squeak (class)
  - MuteQuack (class)
```

With this design, other types of objects can re-use our fly and quack behaviors because these behaviors are no longer hidden away in our `Duck` classes. We can also add new behaviors without modifying any of our existing behavior classes or touching any of the `Duck` classes that use flying behaviors.

> 💡 Design Principle: Program to an interface (aka supertype), not an implementation.

The more verbose / precise defintiion of the above principle:
The declared type of the variables should be a supertype, usually an abstract class or interface, so that the objects assigned to those variables can be of any concrete implementation of the supertype, which means the class declaring them doesn't have to know about the actual object types.
Concise defintiion: exploit polymorphism by programming to a supertype, so the actual runtime object isn't locked into the code!

Example of **programming to an implementation**: Declaring the variable "d" as type `Dog` (a concrete implementation of `Animal`) forces us to code to a concrete implementation.

```java
Dog d = new Dog();
d.bark();
```

Example of **programming to an interface/supertype**: We know it's a `Dog`, but we can now use the animal reference polymorphically.

```java
Animal animal = new Dog();
animal.makeSound();
```

Example of **assigning the conrete implementation object at runtime**: We don't know what the actual animal subtype is, but we know it responds to `makeSound()` and that's all that matters to us.

```java
a = getAnimal();
a.makeSound();
```

<hr>

✏️ Exercises
Q: What would you do if you need to add rocket-powered flying to the `SimUIDuck` app?
A: Make a `FlyWithRocketPower` class that implements that `FlyBehavior` interface.

Q: Can you thik of a class that might want to use the Quack Behavior that isn't a duck?
A: An electronic device that makes a duck call.

#### The Solution

A `Duck` will now _*delegate*_ its flying and quacking behaviors, instead of using quacking and flying methods defined in the `Duck` class (or subclass).

1. Add two instances variables of type `FlyBehavior` and `QuackBehavior` to `Duck` Interface
2. Each concrete duck object will assign to those variables a specific behavior at runtime, such as `FlyWithWings` or `Squeak`
3. Remove the `fly()` and `quack()` methods from the `Duck` class
4. Replace `fly()` and `quack()` in the Duck class with two similar methods called `performFly()` and `performQuack()`

```java
public abstract class Duck {
  QuackBehavior quackBehavior;

  public void performQuack() {
    quackBehavior.quack();
  }
}
```

- Each `Duck` has a reference to something that implements the `QuackBehavior` interface
- Rather than handling the quack behavior itself, the `Duck` object _delegates_ that behavior to the object referenced by `quackBehavior`

To set `flyBehavior` and `quackBehavior`, we can look at a class for a specific duck to see how it's defined.

```java
// Create a MallardDuck class that extends Duck
public class MallardDuck extends Duck {

  // Create a class constructor
  public MallardDuck() {
    // Set the initial value for quackBehavior attribute,
    // inherited from the superclass
    quackBehavior = new Quack();

    // Set the initial value for  flyBehavior attribute,
    // also inherited from the superclass
    flyBehavior = new FlyWithWings();
  }


  public void display() {
    System.out.println("I'm a real Mallard Duck!");
  }
}

```

To set behavior dynamically, we can modify our code to create settings for `flyBehavior` and `quackBehavior`

```java
public abstract class Duck {
  QuackBehavior quackBehavior;
  FlyBehavior flyBehavior;

  public void performQuack() {
    quackBehavior.quack();
  }

  public void performFly() {
    flyBehavior.fly();
  }

  public void setFlyBehavior(FlyBheavior fb) {
    flyBehavior = fb;
  }

  public void setQuackBehavior(QuackBehavior qb) {
    quackBehavior = qb;
  }
}
```

#### The Big Picture on encapsulated behaviors

Instead of thinking of duck behaviors as a set of behaviors, think of them as a family of algorithms where each algorithm represents things a duck would do. This could easily be applied in other scenarios, like computing sales tax by different states.

Relationships between classes should be considered. Ask yourself, is there a **IS-A** relationship or a **HAS-A** relationship (or **IMPLEMENTS**).

For the Duck interfaces and classes:

- `Duck` has a `FlyBehavior`
- `Duck` has a `QuackBehavior`
- `MallardDuck` is a `Duck`
- `FlyWithWings` implements `FlyBehavior`
- `Quack` implements `QuackBehavior`

> 💡 Design Principle: Favor composition over inheritance.

When you put two classes together, like with each duck having a `FlyBehavior` and `QuackBehavior` to which it delegates flying and quacking, you are using **composition**. Instead of _inheriting_ behavior, the ducks get their behavior by being _composed_ with the right behavior object.

Creating systems using composition gives you a lot more flexibility.

- Encapsulation of a family of algorithms into a set of their own classes
- Change behavior at runtime

How would you implement your own duck call (a device hunters to use to mimic the quacks of ducks) that does _not_ inherit from the Duck class?
A: Create a DuckCall class has a `QuackBehavior`.

> 💡 Strategy Pattern - Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.
