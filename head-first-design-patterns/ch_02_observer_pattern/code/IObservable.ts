import { IObserver } from "./IObserver";

export interface IObservable {
  addObserver(o: IObserver): void;
  removeObserver(O: IObserver): void;
  notifyObservers(): void;
}
