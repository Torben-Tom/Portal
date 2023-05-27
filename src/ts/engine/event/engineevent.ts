class EngineEvent<T> {
  private _eventData: T;

  get eventData(): T {
    return this._eventData;
  }

  constructor(eventData: T) {
    this._eventData = eventData;
  }
}

export default EngineEvent;
