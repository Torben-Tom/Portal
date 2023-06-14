import Vector2D from "./vector2d.js";

class Rectangle {
  private _location: Vector2D;
  private _width: number;
  private _height: number;

  get location(): Vector2D {
    return this._location;
  }

  set location(value: Vector2D) {
    this._location = value;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get centerRelative(): Vector2D {
    return new Vector2D(this.width / 2, this.height / 2);
  }

  get centerAbsolute(): Vector2D {
    return this.location.add(this.centerRelative);
  }

  get corners(): Vector2D[] {
    let topLeft = this.location;
    let topRight = new Vector2D(this.location.x + this.width, this.location.y);
    let bottomLeft = new Vector2D(
      this.location.x,
      this.location.y + this.height
    );
    let bottomRight = new Vector2D(
      this.location.x + this.width,
      this.location.y + this.height
    );

    return [topLeft, topRight, bottomLeft, bottomRight];
  }

  constructor(x: number, y: number, width: number, height: number) {
    this._location = new Vector2D(x, y);
    this._width = width;
    this._height = height;
  }

  public isInside(point: Vector2D): boolean {
    return (
      point.x >= this.location.x &&
      point.x <= this.location.x + this.width &&
      point.y >= this.location.y &&
      point.y <= this.location.y + this.height
    );
  }
}

export default Rectangle;
