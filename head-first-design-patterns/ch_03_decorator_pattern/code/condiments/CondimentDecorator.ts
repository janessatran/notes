import { Beverage } from "../coffees/Beverage";

export abstract class CondimentDecorator extends Beverage {
  public beverage: Beverage;

  public abstract getDescription(): string;
}
