export enum Size {
  Tall = "Tall",
  Grande = "Grande",
  Venti = "Venti",
}

export abstract class Beverage {
  private _description: string;
  private _size: Size;

  constructor() {
    this.setDescription("Add a description!");
    this.setSize(Size.Tall);
  }

  public getDescription(): string {
    return this._description;
  }

  public setDescription(description: string) {
    this._description = description;
  }

  public setSize(size: Size) {
    this._size = size;
  }

  public getSize(): Size {
    return this._size;
  }

  public abstract cost(): number;
}
