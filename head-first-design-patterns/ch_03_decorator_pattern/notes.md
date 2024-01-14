## Chapter 3. Decorating Objects - The Decorator Pattern

Decorators allow us to give objects new resposibilities without making any code changes to the underlying classes.

**Scenario**: Starbuzz coffee is trying to update their coffee systems to match their beverage offerings. Their original design entails a `Beverage` abstract class that is subclassed by all beverage varieties in their coffee shop.

| Beverage                                       |
| ---------------------------------------------- |
| description - instance var                     |
| getDescription() - getter for description      |
| cost() - abstract method defined by subclasses |

| HouseBlend |
| ---------- |
| cost()     |

| DarkRoast |
| --------- |
| cost()    |

Starbuzz also offers add-ins to their coffee, like steamed milk, syrups, whipped cream, etc. They charge a bit for each condiment, so they need to update their system to account for this.

In their first attempt they have created new classes for all possible variations of their coffees with these condiments (think `HouseBlendWithOatMilkAndWhippedCream`). YIKES!!!

_Exercise_ :Thinking beyond the maintenance problem, which of the design principles that we’ve covered so far are they violating?

1. Favor composition over inheritance.
2. Strive for loose coupling between objects that interact. ??

> ☯️ Design Principle: Classes should be open for extension, but closed for modification.

**How decorators work**:

- Decorators have the same supertype as the objects they decorate.
- You can use one or more to wrap an object.
- Given the decorator has the same supertype as the object it's decorating, we can pass around a decorated object in place of the original (wrapped) object.
- The decorator adds its own behavior before and/or after delegating to the object it decorates to do the rest of the job.
- Objects can be decorated at any time, so we can decorate objects dynamically at runtime with as many decorators as we like.

> 💡 The Decorator Pattern attaches additional responsibilities to an object dynamically. Decorates provide a flexible alternative to subclassing for extending functionality.

What are some of the known downsides to the decorator pattern?

- They add a lot of small classes to a design, which can result in a design that is less straightforward (think of all the Java I/O libraries!)
- Code dependent on specific types can often result in errors if client code isn't careful
- Increased code complexity needed to instantiate a component

Later we will learn about the **Factory and Builder** patterns which should help alleviate some of the above issues!

### Summary

The Object-oriented Principles we've learned up to this point include:

- Encapsulte what varies
- Favor composition over inheritance
- Program to interfaces, not implementations.
- Strive for loosely coupled designs between objects that interact.
- **Classes should be open for extension but closed for modification.** aka Open-Closed Principle!!

**The Decorator Pattern** attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

Things to note:

- Inheritance is one form of extension, but not necessarily the best way to achieve flexibility in our designs.
- In our designs, we should allow behavior to be extended without the need to modify existing code.
- Composition and delegation can often be used to add new behaviors at runtime.
- The Decrator Pattern provides an alternative to subclassing for extending behavior.
- The Decrator Pattern involves a set of decorator classes that are used to wrap concrete components.
- Decorator classes mirror the type of the components they decorate. In fact, they are the same type as the components they decorate, either through inheritance or interface implementation.
- Decorators can change behavior of their components by adding new functionality before and/or after (or in place of) methods called to the component.
- You can wrap a component with any number of decorators.
- Decorators are typically transparent to the client of the component, that is, unless the client is relying on the component's concrete type.
- Decorators can result in many small objects in our design, and overuse can be complex.
