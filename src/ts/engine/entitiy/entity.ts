import BoundingBox from "./boundingbox.js";

class Entity {
  private _x: number;
  private _y: number;
  private _boundingBox: BoundingBox;

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get boundingBox(): BoundingBox {
    return this._boundingBox;
  }

  constructor(x: number, y: number, width: number, height: number) {
    this._x = x;
    this._y = y;
    this._boundingBox = new BoundingBox(this, width, height);
  }

  update(delta: number) {}
}

export default Entity;
