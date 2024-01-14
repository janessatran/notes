import { Beverage } from "./Beverage";

export class Decaf extends Beverage {
  constructor() {
    super();
    this.setDescription("Decaf");
  }

  public cost(): number {
    return 1.05;
  }
}
