import { Beverage } from "./Beverage";

export class HouseBlend extends Beverage {
  constructor() {
    super();
    const description = "House Blend";
    this.setDescription(description);
  }

  public cost(): number {
    {
      return 0.99;
    }
  }
}
