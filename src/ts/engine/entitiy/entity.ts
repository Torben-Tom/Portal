import Texture from "../assets/texture/texture.js";
import BoundingBox from "./boundingbox.js";

class Entity {
  protected _x: number;
  protected _y: number;
  private _scalingX: number;
  private _scalingY: number;
  private _boundingBox: BoundingBox | null;
  private _texture: Texture;

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get scalingX(): number {
    return this._scalingX;
  }

  get scalingY(): number {
    return this._scalingY;
  }

  get boundingBox(): BoundingBox | null {
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
    texture: Texture,
    widthExpansion?: number,
    heightExpansion?: number
  ) {
    this._x = x;
    this._y = y;
    this._scalingX = scalingX;
    this._scalingY = scalingY;
    this._texture = texture;

    if (
      widthExpansion === undefined ||
      heightExpansion === undefined ||
      Number.isNaN(widthExpansion) ||
      Number.isNaN(heightExpansion)
    ) {
      this._boundingBox = null;
    } else {
      this._boundingBox = new BoundingBox(
        this,
        widthExpansion,
        heightExpansion
      );
    }
  }

  update(delta: number) {}
}

export default Entity;
