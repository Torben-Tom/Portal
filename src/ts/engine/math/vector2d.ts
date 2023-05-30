import Point from "./point.js";

class Vector2D {
  private xCord: number;
  private yCord: number;

  get x(): number {
    return this.xCord;
  }

  get y(): number {
    return this.yCord;
  }

  get length(): number {
    return Math.sqrt(this.xCord * this.xCord + this.yCord * this.yCord);
  }

  constructor(x: number, y: number) {
    this.xCord = x;
    this.yCord = y;
  }

  public static fromPoints(point1: Point, point2: Point): Vector2D {
    return new Vector2D(point2.x - point1.x, point2.y - point1.y);
  }

  public add(vector: Vector2D): Vector2D {
    return new Vector2D(this.xCord + vector.xCord, this.yCord + vector.yCord);
  }

  public subtract(vector: Vector2D): Vector2D {
    return new Vector2D(this.xCord - vector.xCord, this.yCord - vector.yCord);
  }

  public multiply(vector: Vector2D): Vector2D {
    return new Vector2D(this.xCord * vector.xCord, this.yCord * vector.yCord);
  }

  public multiplyScalar(scalar: number): Vector2D {
    return new Vector2D(this.xCord * scalar, this.yCord * scalar);
  }

  public divide(vector: Vector2D): Vector2D {
    return new Vector2D(this.xCord / vector.xCord, this.yCord / vector.yCord);
  }

  public normalize(): Vector2D {
    const length = this.length;
    return new Vector2D(this.xCord / length, this.yCord / length);
  }

  public resolve(): Point {
    return new Point(this.xCord, this.yCord);
  }
}

export default Vector2D;
