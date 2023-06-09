import Vector2D from "./vector2d.js";

class Matrix2D {
  private _a: number;
  private _b: number;
  private _c: number;
  private _d: number;

  get a(): number {
    return this._a;
  }

  get b(): number {
    return this._b;
  }

  get c(): number {
    return this._c;
  }

  get d(): number {
    return this._d;
  }

  get inverse(): Matrix2D | undefined {
    let det: number = this._a * this._d - this._b * this._c;
    if (det === 0) {
      return undefined;
    }
    return new Matrix2D(
      this._d,
      -1 * this._b,
      -1 * this._c,
      this._a
    ).multiplyScalar(1 / det);
  }

  constructor(a: number, b: number, c: number, d: number) {
    this._a = a;
    this._b = b;
    this._c = c;
    this._d = d;
  }

  public add(matrix: Matrix2D): Matrix2D {
    return new Matrix2D(
      this._a + matrix._a,
      this._b + matrix._b,
      this._c + matrix._c,
      this._d + matrix._d
    );
  }

  public subtract(matrix: Matrix2D): Matrix2D {
    return new Matrix2D(
      this._a - matrix._a,
      this._b - matrix._b,
      this._c - matrix._c,
      this._d - matrix._d
    );
  }

  public multiply(matrix: Matrix2D): Matrix2D {
    return new Matrix2D(
      this._a * matrix._a + this._b * matrix._c,
      this._a * matrix._b + this._b * matrix._d,
      this._c * matrix._a + this._d * matrix._c,
      this._c * matrix._b + this._d * matrix._d
    );
  }

  public multiplyVector(vector: Vector2D): Vector2D {
    return new Vector2D(
      this._a * vector.x + this._b * vector.y,
      this._c * vector.x + this._d * vector.y
    );
  }

  public multiplyScalar(scalar: number): Matrix2D {
    return new Matrix2D(
      this._a * scalar,
      this._b * scalar,
      this._c * scalar,
      this._d * scalar
    );
  }

  public static rotationMatrix(angle: number): Matrix2D {
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
    return new Matrix2D(cos, -sin, sin, cos);
  }
}

export default Matrix2D;
