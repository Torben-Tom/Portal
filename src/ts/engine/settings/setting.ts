import EngineEvent from "../event/engineevent.js";
import EngineEventHandler from "../event/engineventhandler.js";

class Setting<T> {
  private _get: (() => T) | undefined;
  private _set: ((value: T) => void) | undefined;

  private _valueChangEvent: EngineEventHandler<T, EngineEvent<T>>;

  public get(): T {
    if (!this._get) {
      throw new Error("Get-Method not implemented for this setting.");
    }
    return this._get();
  }

  public set(value: T): void {
    if (!this._set) {
      throw new Error("Set-Method not implemented for this setting.");
    }
    this._set(value);
    this._valueChangEvent.dispatch(new EngineEvent<T>(value));
  }

  public get valueChangeEvent(): EngineEventHandler<T, EngineEvent<T>> {
    return this._valueChangEvent;
  }

  public constructor(
    get: (() => T) | undefined,
    set: ((value: T) => void) | undefined
  ) {
    this._get = get;
    this._set = set;
    this._valueChangEvent = new EngineEventHandler<T, EngineEvent<T>>();
  }
}

export default Setting;
