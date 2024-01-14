import { Beverage } from "./Beverage";

export class DarkRoast extends Beverage {
  constructor() {
    super();
    const description = "Dark Roast";
    this.setDescription(description);
  }

  public cost(): number {
    return 0.99;
  }
}
