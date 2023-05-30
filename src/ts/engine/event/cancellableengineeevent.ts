import EngineEvent from "./engineevent.js";

class CancellableEngineEvent<T> extends EngineEvent<T> {
  private _cancelled: boolean;

  get cancelled(): boolean {
    return this._cancelled;
  }

  constructor(eventData: T) {
    super(eventData);
    this._cancelled = false;
  }

  cancel(): void {
    this._cancelled = true;
  }
}

export default CancellableEngineEvent;
