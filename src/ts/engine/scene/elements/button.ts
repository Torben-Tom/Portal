import MouseClickEvent from "../../event/events/mouseclickevent/mouseclickevent.js";
import Label from "./label.js";

class Button extends Label {
  private _backgroundUnhovered: string | CanvasGradient | CanvasPattern;
  private _backgroundHover: string | CanvasGradient | CanvasPattern;

  private _foregroundHover: string | CanvasGradient | CanvasPattern;
  private _foregroundUnhovered: string | CanvasGradient | CanvasPattern;

  private _borderUnhovered: string | CanvasGradient | CanvasPattern;
  private _borderHover: string | CanvasGradient | CanvasPattern;

  private _borderSizeUnhovered: number;

  private _onClick: ((mouseClickEvent: MouseClickEvent) => void) | null;

  public get backgroundUnhovered(): string | CanvasGradient | CanvasPattern {
    return this._backgroundUnhovered;
  }

  protected set backgroundUnhovered(
    value: string | CanvasGradient | CanvasPattern
  ) {
    this._backgroundUnhovered = value;
  }

  public get backgroundHover(): string | CanvasGradient | CanvasPattern {
    return this._backgroundHover;
  }

  protected set backgroundHover(
    value: string | CanvasGradient | CanvasPattern
  ) {
    this._backgroundHover = value;
  }

  public get foregroundUnhovered(): string | CanvasGradient | CanvasPattern {
    return this._foregroundUnhovered;
  }

  protected set foregroundUnhovered(
    value: string | CanvasGradient | CanvasPattern
  ) {
    this._foregroundUnhovered = value;
  }

  public get foregroundHover(): string | CanvasGradient | CanvasPattern {
    return this._foregroundHover;
  }

  protected set foregroundHover(
    value: string | CanvasGradient | CanvasPattern
  ) {
    this._foregroundHover = value;
  }

  public get borderUnhovered(): string | CanvasGradient | CanvasPattern {
    return this._borderUnhovered;
  }

  protected set borderUnhovered(
    value: string | CanvasGradient | CanvasPattern
  ) {
    this._borderUnhovered = value;
  }

  public get borderHover(): string | CanvasGradient | CanvasPattern {
    return this._borderHover;
  }

  protected set borderHover(value: string | CanvasGradient | CanvasPattern) {
    this._borderHover = value;
  }

  public get onClick(): ((mouseClickEvent: MouseClickEvent) => void) | null {
    return this._onClick;
  }

  public set onClick(
    value: ((mouseClickEvent: MouseClickEvent) => void) | null
  ) {
    this._onClick = value;
  }

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    backgroundUnhovered: string | CanvasGradient | CanvasPattern,
    backgroundHover: string | CanvasGradient | CanvasPattern,
    foregroundUnhovered: string | CanvasGradient | CanvasPattern,
    foregroundHover: string | CanvasGradient | CanvasPattern,
    borderUnhovered: string,
    borderHover: string,
    borderSize: number,
    font: string,
    textAlign: CanvasTextAlign,
    textBaseline: CanvasTextBaseline,
    text: string,
    visible: boolean
  ) {
    super(
      x,
      y,
      width,
      height,
      backgroundUnhovered,
      foregroundUnhovered,
      borderUnhovered,
      borderSize,
      font,
      textAlign,
      textBaseline,
      text,
      visible
    );

    this._backgroundUnhovered = backgroundUnhovered;
    this._backgroundHover = backgroundHover;

    this._foregroundUnhovered = foregroundUnhovered;
    this._foregroundHover = foregroundHover;

    this._borderUnhovered = borderUnhovered;
    this._borderHover = borderHover;

    this._borderSizeUnhovered = borderSize;

    this._onClick = null;
  }

  public update(): void {
    if (this.hovered) {
      this.background = this._backgroundHover;
      this.foreground = this._foregroundHover;
      this.border = this._borderHover;
      this.borderSize = this._borderSizeUnhovered + 3;
    } else {
      this.background = this._backgroundUnhovered;
      this.foreground = this._foregroundUnhovered;
      this.border = this._borderUnhovered;
      this.borderSize = this._borderSizeUnhovered;
    }
  }

  public click(mouseClickEvent: MouseClickEvent): void {
    if (this._onClick) {
      this._onClick(mouseClickEvent);
    }
  }
}

export default Button;
