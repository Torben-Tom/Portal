import Texture from "../assets/texture/texture.js";
import Element from "./element.js";

class Scene {
  private _background: string | CanvasGradient | CanvasPattern | Texture;
  private _elements: Element[];

  public get background(): string | CanvasGradient | CanvasPattern | Texture {
    return this._background;
  }

  public get elements(): Element[] {
    return this._elements;
  }

  public constructor(
    background: string | CanvasGradient | CanvasPattern | Texture
  ) {
    this._background = background;
    this._elements = [];
  }

  protected addElement(element: Element): void {
    this._elements.push(element);
  }

  public open(): void {}
  public close(): void {}

  public update(tickDelta: number): void {
    for (let element of this._elements) {
      element.update(tickDelta);
    }
  }
}

export default Scene;
