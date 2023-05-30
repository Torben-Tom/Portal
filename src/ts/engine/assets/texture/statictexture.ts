import Texture from "./texture.js";

class StaticTexture extends Texture {
  private _htmlImageElement: HTMLImageElement;
  private _width: number;
  private _height: number;

  get htmlImageElement(): HTMLImageElement {
    return this._htmlImageElement;
  }

  get x(): number {
    return 0;
  }

  get y(): number {
    return 0;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  constructor(htmlImageElement: HTMLImageElement) {
    super();
    this._htmlImageElement = htmlImageElement;
    this._width = htmlImageElement.width;
    this._height = htmlImageElement.height;
  }
}

export default StaticTexture;
