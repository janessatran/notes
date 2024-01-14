import { Beverage, Size } from "./Beverage";

export class Espresso extends Beverage {
  constructor() {
    super();

    const description = "Espresso";
    this.setDescription(description);
  }

  public cost(): number {
    {
      return 1.99;
    }
  }
}
