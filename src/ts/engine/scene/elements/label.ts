import Element from "../element.js";

class Label extends Element {
  private _foreground: string | CanvasGradient | CanvasPattern;
  private _font: string;
  private _textAlign: CanvasTextAlign;
  private _textBaseline: CanvasTextBaseline;
  private _text: string;

  public get foreground(): string | CanvasGradient | CanvasPattern {
    return this._foreground;
  }

  public set foreground(value: string | CanvasGradient | CanvasPattern) {
    this._foreground = value;
  }

  public get font(): string {
    return this._font;
  }

  public set font(value: string) {
    this._font = value;
  }

  public get textAlign(): CanvasTextAlign {
    return this._textAlign;
  }

  public set textAlign(value: CanvasTextAlign) {
    this._textAlign = value;
  }

  public get textBaseline(): CanvasTextBaseline {
    return this._textBaseline;
  }

  public set textBaseline(value: CanvasTextBaseline) {
    this._textBaseline = value;
  }

  public get text(): string {
    return this._text;
  }

  public set text(value: string) {
    this._text = value;
  }

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    background: string | CanvasGradient | CanvasPattern,
    foreground: string | CanvasGradient | CanvasPattern,
    border: string,
    borderSize: number,
    font: string,
    textAlign: CanvasTextAlign,
    textBaseline: CanvasTextBaseline,
    text: string,
    visible: boolean
  ) {
    super(x, y, width, height, background, border, borderSize, visible);

    this._foreground = foreground;
    this._font = font;
    this._textAlign = textAlign;
    this._textBaseline = textBaseline;
    this._text = text;
  }
}

export default Label;
