import Point from "./point.js";
import RectangularArea from "./rectangulararea.js";

class Rectangle implements RectangularArea {
  private _location: Point;
  private _width: number;
  private _height: number;

  get location(): Point {
    return this._location;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get center(): Point {
    return new Point(
      this.location.x + this.width / 2,
      this.location.y + this.height / 2
    );
  }

  constructor(x: number, y: number, width: number, height: number) {
    this._location = new Point(x, y);
    this._width = width;
    this._height = height;
  }
}

export default Rectangle;
