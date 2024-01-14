import { Beverage } from "../coffees/Beverage";
import { CondimentDecorator } from "./CondimentDecorator";

export class SteamedMilk extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  public getDescription(): string {
    return this.beverage.getDescription() + ", Steamed milk";
  }

  public cost(): number {
    return this.beverage.cost() + 0.1;
  }
}
