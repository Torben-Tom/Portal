import EngineEventHandler from "../../event/engineventhandler.js";
import MouseClickEvent from "../../event/events/mouseclickevent/mouseclickevent.js";
import MouseClickEventData from "../../event/events/mouseclickevent/mouseclickeventdata.js";
import Label from "./label.js";

class Button extends Label {
  private _borderHover: string;
  private _onClick: ((mouseClickEvent: MouseClickEvent) => void) | null;

  private _originalBorder: string;
  private _originalBorderSize: number;

  public get borderHover(): string {
    return this._borderHover;
  }

  protected set borderHover(value: string) {
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
    background: string | CanvasGradient | CanvasPattern,
    border: string,
    borderSize: number,
    visible: boolean,
    foreground: string | CanvasGradient | CanvasPattern,
    textAlign: CanvasTextAlign,
    textBaseline: CanvasTextBaseline | undefined | null,
    font: string,
    text: string,
    borderHover: string
  ) {
    super(
      x,
      y,
      width,
      height,
      background,
      border,
      borderSize,
      visible,
      foreground,
      textAlign,
      textBaseline,
      font,
      text
    );

    this._borderHover = borderHover;
    this._onClick = null;

    this._originalBorder = border;
    this._originalBorderSize = borderSize;
  }

  public update(): void {
    this.borderSize = this.hovered
      ? this._originalBorderSize + 3
      : this._originalBorderSize;

    this.border = this.hovered ? this._borderHover : this._originalBorder;
  }

  public click(mouseClickEvent: MouseClickEvent): void {
    if (this._onClick) {
      this._onClick(mouseClickEvent);
    }
  }
}

export default Button;
