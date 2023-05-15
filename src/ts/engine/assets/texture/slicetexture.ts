import Slice from "./slice.js";
import Texture from "./texture.js";

class SliceTexture extends Texture {
  private _slice: Slice;

  get htmlImageElement(): HTMLImageElement {
    return this._slice.htmlImageElement;
  }

  get x(): number {
    return this._slice.x;
  }

  get y(): number {
    return this._slice.y;
  }

  get width(): number {
    return this._slice.width;
  }

  get height(): number {
    return this._slice.heigth;
  }

  constructor(slice: Slice) {
    super();
    this._slice = slice;
  }
}

export default SliceTexture;
