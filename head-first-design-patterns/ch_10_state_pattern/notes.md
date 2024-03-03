## Chapter 10. The State of Things: The State Pattern

The Strategy and State Pattern are closely related, though they have different intents. The Strategy pattern helps with intechangeability of algorithms, while State helps objects control their behavior by changing their internal state.

### State Machines 101

This is how you implement a state machine, using a gumball machine as an example.

1. Gather up your states

- No Quarter
- Has Quarter
- Out of Gumballs
- Gumball Sold

2. Create an instance variable to hold the current state, and define values for each of the states

```java

// Each state is represented as a unique integer
final static int SOLD_OUT = 0;
final static int NO_QUARTER = 1;
final static int HAS_QUARTER = 2;
final static int SOLD = 3;

// An instance variable holds the current state
int state = SOLD_OUT;
```

3. Gather up all the actions that can happen in the system:

- Insert quarter
- Eject quarter
- Turn crank
- Dispense

4. Create a class that acts as the state machine. For each action, create a method that uses conditional statements to determine what behavior is appropriate in each state. For instance:

```java
public void insertQuarter() {
  if (state == HAS_QUARTER) {
    System.out.println("You can't insert another quarter!");
  } else if (state == NO_QUARTER) {
    state = HAS_QUARTER;
    System.out.println("You inserted a quarter");
  } else if (state == SOLD_OUT) {
    System.out.println("You can't insert a quarter, the machine is sold out");
  } else if (state == SOLD) {
    System.out.println("Please wait, we're already giving you a gumball");
  }
}

```

### Implementing the State Machine

To make things easy to maintain and change, we localizze behavior by putting all behavior of a state into one class.

First, we create an interface for State, which all our states implement. Then, we take each state in our design and encapsulate it in a class that implements the `State` interface.

These methods map directly to the actions that could happen to the Gumball Machine.

| State           |
| --------------- |
| insertQuarter() |
| ejectQuarter()  |
| turnCrank()     |
| dispense()      |

Each of our previously defined states will implement this interface:

```java
class SoldState implements State {
  ...
}
```

To implement our states, we specify the behavior of the classes when each action is called.
**NoQuarterState**:

- `insertQuarter()` will go to `HasQuarterState`
- `ejectQuarter()` will tell the customer "You haven't inserted a quarter"

**HasQuarterState**:

- `turnCrank()` will go to `SoldState`

**SoldState**:

- `insertQuarter()` will tell the customer "Please wait, we're already giving you a gumball"
- `dispense()` will dispense one gumball and check if the number of gumballs is greater than 0. If true, this will go to `NoQuarterState`, otherwise it will go to `SoldOutState`

**SoldOutState**:

- `turnCrank()` tell the customer "There are no gumballs"

**WinnerState**:

- `dispense()` will dispense a winner sticker (?)

**An example of `NoQuarterState` full implementation**:

```java
public class NoQuarterState implements State {
 GumballMachine gumballMachine;

 public NoQuarterState(GumballMachine gumballMachine) {
   this.gumballMachine = gumballMachine;
 }

 public void insertQuarter() {
   System.out.println("You inserted a quarter!");
   gumballMachine.setState(gumballMachine.getHasQuarterState());
 }

 public void ejectQuarter() {
   System.out.println("You haven't inserted a quarter");
 }

 public void turnCrank() {
   System.out.println("You turned, but there's no quarter");
 }

 public void dispense() {
   System.out.println("You need to pay first");
 }
}

```

**Now, the complete GumballMachine class**:

```java
public class GumballMachine {
  State soldOutState;
  State noQuarterState;
  State hasQuarterState;
  State soldState;

  State state;
  int count = 0;

  public GumballMachine(int numberGumballs) {
    soldOutState = new SoldOutState(this);
    noQuarterState = new NoQuarterState(this);
    hasQuarterState = new HasQuarterState(this);
    soldState = new SoldState(this);

    this.count = numberGumballs;
    if (numberGumballs > 0 ) {
      state = noQuarterState;
    } else {
      state = soldOutState;
    }
  }

  public void insertQuarter() {
    state.insertQuarter();
  }

  public void ejectQuarter() {
    state.ejectQuarter();
  }

  public void turnCrank() {
    state.turnCrank();
    state.dispense();
  }

  void setState(State state) {
    this.state = state;
  }

  void releaseBall() {
    System.out.println("A gumball comes rolling out of the slot...");

    if(count > 0) {
      count = count - 1;
    }
  }

  ...
}

```

> 💡 The State Pattern allows an object to alter its behavior when its internal state changes. The object will appear to change its class.

## Summary

- The State Pattern allows an object to have many different behaviors that are based on its internal state.

- Unlike a procedural state machine, the State Pattern represents each state as a full-blown class.

- The Context gets its behavior by delegating to the current state object it is composed with.

- By encapsulating each state into a class, we localize any changes that will need to be made.

- The State and Strategy Patterns have the same class diagram, but they differ in intent.

- The Strategy Pattern typically configures Context classes with a behavior or algorithm.

- The State Pattern allows a Context to change its behavior as the state of the Context changes.

- State transitions can be controlled by the State classes or by the Context classes.

- Using the State Pattern will typically result in a greater number of classes in your design.

- State classes may be shared among Context instances.
