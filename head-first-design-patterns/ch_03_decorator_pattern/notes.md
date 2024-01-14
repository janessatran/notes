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
