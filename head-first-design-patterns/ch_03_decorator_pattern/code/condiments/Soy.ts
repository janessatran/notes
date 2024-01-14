import { Beverage, Size } from "../coffees/Beverage";
import { CondimentDecorator } from "./CondimentDecorator";

export class Soy extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
    this.setSize(beverage.getSize());
  }

  public getDescription(): string {
    return this.beverage.getDescription() + ", Soy";
  }

  public cost(): number {
    const size = this.beverage.getSize();
    let additionalCost: number;
    switch (size) {
      case Size.Tall:
        additionalCost = 0.1;
        break;
      case Size.Grande:
        additionalCost = 0.15;
        break;
      case Size.Venti:
        additionalCost = 0.2;
        break;
    }

    return this.beverage.cost() + additionalCost;
  }
}
