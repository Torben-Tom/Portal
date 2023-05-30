import CancellableEngineEvent from "./cancellableengineeevent.js";
import EngineEvent from "./engineevent.js";

class EngineEventHandler<E, T extends EngineEvent<E>> {
  private _subscribers: ((event: T) => void)[];

  constructor() {
    this._subscribers = [];
  }

  subscribe(subscriber: (event: T) => void): void {
    this._subscribers.push(subscriber);
  }

  unsubscribe(subscriber: (event: T) => void): void {
    let index = this._subscribers.indexOf(subscriber);
    if (index >= 0) {
      this._subscribers.splice(index, 1);
    }
  }

  dispatch(event: T): void {
    for (let subscriber of this._subscribers) {
      if (event instanceof CancellableEngineEvent) {
        if (event.cancelled) {
          return;
        }
      }
      try {
        subscriber(event);
      } catch (error) {
        console.error(
          `Error while dispatching event ${event.constructor.name} to subscriber ${subscriber.name}`
        );
      }
    }
  }
}

export default EngineEventHandler;
