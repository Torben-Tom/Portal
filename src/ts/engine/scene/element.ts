import MouseClickEvent from "../event/events/mouseclickevent/mouseclickevent.js";
import Rectangle from "../math/rectangle.js";

class Element extends Rectangle {
  private _background: string | CanvasGradient | CanvasPattern;
  private _border: string | CanvasGradient | CanvasPattern;
  private _borderSize: number;
  private _visible: boolean;
  private _hovered: boolean;

  public get background(): string | CanvasGradient | CanvasPattern {
    return this._background;
  }

  public set background(value: string | CanvasGradient | CanvasPattern) {
    this._background = value;
  }

  public get border(): string | CanvasGradient | CanvasPattern {
    return this._border;
  }

  public set border(value: string | CanvasGradient | CanvasPattern) {
    this._border = value;
  }

  public get borderSize(): number {
    return this._borderSize;
  }

  public set borderSize(value: number) {
    this._borderSize = value;
  }

  public get visible(): boolean {
    return this._visible;
  }

  public set visible(value: boolean) {
    this._visible = value;
  }

  public get hovered(): boolean {
    return this._hovered;
  }

  public set hovered(value: boolean) {
    this._hovered = value;
  }

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    background: string | CanvasGradient | CanvasPattern,
    border: string,
    borderSize: number,
    visible: boolean
  ) {
    super(x, y, width, height);
    this._background = background;
    this._border = border;
    this._borderSize = borderSize;
    this._visible = visible;
    this._hovered = false;
  }

  public update(tickDelta: number): void {}
  public click(mouseClickEvent: MouseClickEvent): void {}
}

export default Element;
