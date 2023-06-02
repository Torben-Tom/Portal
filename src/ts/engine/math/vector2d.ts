import Point from "./point.js";

class Vector2D {
  private _x: number;
  private _y: number;

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get length(): number {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  }

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public static fromPoints(point1: Point, point2: Point): Vector2D {
    return new Vector2D(point2.x - point1.x, point2.y - point1.y);
  }

  public add(vector2d: Vector2D): Vector2D {
    return new Vector2D(this._x + vector2d._x, this._y + vector2d._y);
  }

  public subtract(vector2d: Vector2D): Vector2D {
    return new Vector2D(this._x - vector2d._x, this._y - vector2d._y);
  }

  public multiply(vector2d: Vector2D): Vector2D {
    return new Vector2D(this._x * vector2d._x, this._y * vector2d._y);
  }

  public multiplyScalar(scalar: number): Vector2D {
    return new Vector2D(this._x * scalar, this._y * scalar);
  }

  public divide(vector2d: Vector2D): Vector2D {
    return new Vector2D(this._x / vector2d._x, this._y / vector2d._y);
  }

  public divideScalar(scalar: number): Vector2D {
    return new Vector2D(this._x / scalar, this._y / scalar);
  }

  public dot(vector2d: Vector2D): number {
    return this._x * vector2d._x + this._y * vector2d._y;
  }

  public angle(vector2d: Vector2D): number {
    return Math.acos(this.dot(vector2d) / (this.length * vector2d.length));
  }

  public normalize(): Vector2D {
    return this.divideScalar(this.length);
  }

  public resolve(): Point {
    return new Point(this._x, this._y);
  }
}

export default Vector2D;
