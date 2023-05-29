import Texture from "../assets/texture/texture.js";
import Point from "../math/point.js";
import BoundingBox from "./boundingbox.js";

class Entity {
  protected _location: Point;
  private _scalingX: number;
  private _scalingY: number;
  private _static: boolean;
  private _boundingBox: BoundingBox;
  private _texture: Texture;

  get location(): Point {
    return this._location;
  }

  get scalingX(): number {
    return this._scalingX;
  }

  get scalingY(): number {
    return this._scalingY;
  }

  get static(): boolean {
    return this._static;
  }

  get boundingBox(): BoundingBox {
    return this._boundingBox;
  }

  get texture(): Texture {
    return this._texture;
  }

  constructor(
    x: number,
    y: number,
    scalingX: number,
    scalingY: number,
    _static: boolean,
    expansionX: number,
    expansionY: number,
    passThrough: boolean,
    texture: Texture
  ) {
    this._location = new Point(x, y);
    this._scalingX = scalingX;
    this._scalingY = scalingY;
    this._static = _static;
    this._boundingBox = new BoundingBox(
      this,
      expansionX,
      expansionY,
      passThrough
    );
    this._texture = texture;
  }

  public teleport(point: Point) {
    this._location = point;
  }

  update(delta: number) {}
}

export default Entity;
