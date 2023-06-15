import Setting from "./setting";

class SimpleSetting<T> extends Setting<T> {
  private _value: T;

  private getValue(): T {
    return this._value;
  }

  private setValue(value: T) {
    this._value = value;
  }

  constructor(value: T) {
    super(
      undefined, //Can't use "this" keyword here, so we'll define the methods below
      undefined
    );

    this._value = value;

    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
  }
}

export default SimpleSetting;
