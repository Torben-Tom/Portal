import Texture from "../assets/texture/texture.js";
import BoundingBox from "./boundingbox.js";

class Entity {
  protected _x: number;
  protected _y: number;
  private _boundingBox: BoundingBox;
  private _texture: Texture;

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
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
    width: number,
    height: number,
    texture: Texture
  ) {
    this._x = x;
    this._y = y;
    this._boundingBox = new BoundingBox(this, width, height);
    this._texture = texture;
  }

  update(delta: number) {}
}

export default Entity;
