import { Beverage } from "../coffees/Beverage";
import { CondimentDecorator } from "./CondimentDecorator";

export class Mocha extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  public getDescription(): string {
    return this.beverage.getDescription() + ", Mocha";
  }

  public cost(): number {
    return this.beverage.cost() + 0.2;
  }
}
