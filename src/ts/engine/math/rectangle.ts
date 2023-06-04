import RectangularArea from "./rectangulararea.js";
import Vector2D from "./vector2d.js";

class Rectangle implements RectangularArea {
  private _location: Vector2D;
  private _width: number;
  private _height: number;

  get location(): Vector2D {
    return this._location;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get center(): Vector2D {
    return new Vector2D(
      this.location.x + this.width / 2,
      this.location.y + this.height / 2
    );
  }

  constructor(x: number, y: number, width: number, height: number) {
    this._location = new Vector2D(x, y);
    this._width = width;
    this._height = height;
  }
}

export default Rectangle;
