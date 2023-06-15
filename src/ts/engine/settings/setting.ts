class Setting<T> {
  private _get: (() => T) | undefined;
  private _set: ((value: T) => void) | undefined;

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
  }

  public constructor(
    get: (() => T) | undefined,
    set: ((value: T) => void) | undefined
  ) {
    this._get = get;
    this._set = set;
  }
}

export default Setting;
