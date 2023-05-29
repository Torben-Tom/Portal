import Vector2D from "./vector2d.js";

class Point {
  xCord: number;
  yCord: number;

  get x(): number {
    return this.xCord;
  }

  get y(): number {
    return this.yCord;
  }

  constructor(x: number = 0, y: number = 0) {
    this.xCord = x;
    this.yCord = y;
  }

  public add(point: Point): Vector2D {
    return new Vector2D(this.xCord + point.xCord, this.yCord + point.yCord);
  }

  public subtract(point: Point): Vector2D {
    return new Vector2D(this.xCord - point.xCord, this.yCord - point.yCord);
  }

  public multiply(point: Point): Vector2D {
    return new Vector2D(this.xCord * point.xCord, this.yCord * point.yCord);
  }

  public divide(point: Point): Vector2D {
    return new Vector2D(this.xCord / point.xCord, this.yCord / point.yCord);
  }
}

export default Point;
