interface FlyBehavior {
  fly(): void;
}

interface QuackBehavior {
  quack(): void;
}

/**
 * Abstract class for Ducks
 */
abstract class Duck {
  flyBehavior: FlyBehavior;
  quackBehavior: QuackBehavior;

  public abstract display(): void;

  public performFly(): void {
    this.flyBehavior.fly();
  }

  public performQuack(): void {
    this.quackBehavior.quack();
  }

  public swim(): void {
    console.log("All ducks float, even decoys!");
  }
}

/**
 * Various Fly Behaviors
 */
class FlyWithWings implements FlyBehavior {
  fly() {
    console.log("I'm flying!");
  }
}

class FlyNoWay implements FlyBehavior {
  fly() {
    console.log("I can't fly!");
  }
}

class FlyRocketPowered implements FlyBehavior {
  fly() {
    console.log("I'm flying with a rocket!");
  }
}

/**
 * Various Quack Behaviors
 */
class Quack implements QuackBehavior {
  quack() {
    console.log("Quack!!!");
  }
}

class MuteQuack implements QuackBehavior {
  quack() {
    console.log(" << Silence >> ");
  }
}

class Squeak implements QuackBehavior {
  quack() {
    console.log("Squeak");
  }
}

/**
 * A Mallard Duck class
 */
class MallardDuck extends Duck {
  constructor() {
    super();
  }

  public display(): void {
    console.log("I'm a Mallard Duck!!!");
  }
}

/**
 * A Model Duck class
 */
class ModelDuck extends Duck {
  constructor() {
    super();

    this.flyBehavior = new FlyNoWay();
    this.quackBehavior = new Quack();
  }

  display() {
    console.log("I'm a model duck!");
  }
}

/**
 * Testing our duck simulator
 */
function createMiniDuckSimulator() {
  const mallard = new MallardDuck();
  mallard.flyBehavior = new FlyWithWings();
  mallard.quackBehavior = new Quack();

  console.log(mallard.display());
  console.log(mallard.performFly());
  console.log(mallard.performQuack());

  const modelDuck = new ModelDuck();
  console.log(modelDuck.display());
  console.log(modelDuck.performFly());
  console.log(modelDuck.performQuack());
}

createMiniDuckSimulator();
