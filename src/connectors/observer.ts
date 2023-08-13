import { ConnectionStateUpdate } from "../data/ethereumContext";

export enum NotificationType {
  StateUpdate,
  ResetState,
}

export interface IObserver<T = ConnectionStateUpdate> {
  update(update: T, type: NotificationType): void;
}

export interface IObservable<T = ConnectionStateUpdate> {
  subscribe(observer: IObserver<T>): void;
  unsubscribe(observer: IObserver<T>): void;
  notify(update: T, type: NotificationType): void;
}

export default class Observable<T> implements IObservable<T> {
  private observers: IObserver<T>[] = [];

  subscribe(observer: IObserver<T>): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: IObserver<T>): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) this.observers.splice(index, 1);
  }

  notify(update: T, type: NotificationType = NotificationType.StateUpdate): void {
    this.observers.forEach((observer) => {
      observer.update(update, type);
    });
  }
}
