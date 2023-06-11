import Matrix2D from "./matrix2d.js";

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

  public add(vector: Vector2D): Vector2D {
    return new Vector2D(this._x + vector._x, this._y + vector._y);
  }

  public subtract(vector: Vector2D): Vector2D {
    return new Vector2D(this._x - vector._x, this._y - vector._y);
  }

  public multiplyScalar(scalar: number): Vector2D {
    return new Vector2D(this._x * scalar, this._y * scalar);
  }

  public concatenate(vector: Vector2D): Matrix2D {
    return new Matrix2D(this._x, vector.x, this._y, vector.y);
  }

  public normalize(): Vector2D {
    const length = this.length;
    return new Vector2D(this._x / length, this._y / length);
  }

  public radiansTo(location: Vector2D): number {
    const delta = location.subtract(this);
    return Math.atan2(delta.y, delta.x);
  }

  public degreesTo(location: Vector2D): number {
    return this.radiansTo(location) * (180 / Math.PI);
  }

  public addDirectionRadians(radians: number, distance: number) {
    const x = distance * Math.cos(radians);
    const y = distance * Math.sin(radians);
    return new Vector2D(this._x + x, this._y + y);
  }

  public addDirectionDegrees(degrees: number, distance: number) {
    return this.addDirectionRadians((degrees * Math.PI) / 180, distance);
  }

  public rotateRadians(radians: number): Vector2D {
    return Matrix2D.rotationMatrixRadians(radians).multiplyVector(this);
  }

  public rotateDegrees(degrees: number): Vector2D {
    return Matrix2D.rotationMatrixDegrees(degrees).multiplyVector(this);
  }
}

export default Vector2D;
