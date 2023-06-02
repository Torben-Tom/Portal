import Vector2D from "./vector2d.js";

class Point {
  private _x: number;
  private _y: number;

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get vector2D(): Vector2D {
    return new Vector2D(this._x, this._y);
  }

  constructor(x: number = 0, y: number = 0) {
    this._x = x;
    this._y = y;
  }

  public add(vector2d: Vector2D): Vector2D {
    return new Vector2D(this._x + vector2d.x, this._y + vector2d.y);
  }

  public subtract(vector2d: Vector2D): Vector2D {
    return new Vector2D(this._x - vector2d.x, this._y - vector2d.y);
  }

  public multiply(vector2d: Vector2D): Vector2D {
    return new Vector2D(this._x * vector2d.x, this._y * vector2d.y);
  }

  public divide(vector2d: Vector2D): Vector2D {
    return new Vector2D(this._x / vector2d.x, this._y / vector2d.y);
  }
}

export default Point;
