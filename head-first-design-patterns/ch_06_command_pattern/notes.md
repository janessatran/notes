## Chapter 6. Encapsulating Invocation: The Command Pattern

This pattern is all about encapsulating method invocation. The Command Pattern turns a request into a stand-alone object containing all information about the request. This lets you pass requests as a method argument, delay or schedule the execution of a request, and support undoable operations.

#### Weather-O-Rama: Request to create API for Home Automation Remote Control

Weather-O-Rama likes our work and has hired us to build an API for their Home Automation Remote Control.
Here are some details about the remote:

- It has seven slots to program
- There are on and off butons for each of the seven slots
- There's a global undo button that undoes the operation of last button pressed

There is some functionality already built out from a vendor. Some of the interfaces include: `CeilingLight`, `ApplianceControl`, `Stereo`, `TV`, `FaucetCOntrol`, etc...

Some things to note from analyzing the existing vendor classes:

- Each class seems to have different methods (`on()`, `off()`, `dim()`, `setTemperature()`, etc,)
- We should figure out how to separate concerns - the remote should know how to interpret button presses and make requests, but it shouldn't need to know more given the variety of functionality for different home appliances
- We can do this by using the **Command Pattern** which allows you to decouple the requester of an action from the object that actually performs the action
- In this case, the requester would be the remote control and the object that performs the action would be an instance of one of our vendor classes
- For example, a command object encapsulates a request to do something (like turn on a light) on a specific object (say, the living room object). If we store a command object for each button, when the button is pressed we ask that command object to do some work. The remote doesn't have any idea what the work is, it just has a command objects that knows how to talk to the right object to get the work done.

#### Command Pattern Example: Ordering something at Objectville Diner

Let's say a customer wants to order something from the diner. We can destribe the interaction using command pattern!

1. Customer makes an order, so we call `createOrder()`, and this `Order` consists of an order slip and menu items that were choesn by the customer.
   a. Think of the order slip as the request to prepare a meal.
   b. The order slip implements an interface which consists of the `orderUp()` method.
   c. It also has a reference to the object that needs to prepare it (the short-order cook)
   d. The waiter doesn't need to know what's in the order or who prepares the meal, they only need to pass the slip through the order window and call `orderUp()`
2. The waiter takes the `Order`, so we call `takeOrder()`, and they call `orderUp()` to begin the Order's preparation
3. The `Order` directs the short-order cook with methods like `makeBurger()`, `makeShake()`
4. The short-order cook foolows the instructions of the `Order` and produces a meal

| Diner            | Command Pattern |
| ---------------- | --------------- |
| Waiter           | Command         |
| Short-order cook | execute()       |
| orderUp()        | Client          |
| Order            | Invoker         |
| Customer         | Reciever        |
| takeOrder()      | setCommand()    |

**Loading the Invoker**

1. The client creates a command object.
2. The client does a `setCommand()` to store the command object in the invoker.
3. Later, the client asks the invoker to execute the command.
