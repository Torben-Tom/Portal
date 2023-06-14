import MouseClickEvent from "../../event/events/mouseclickevent/mouseclickevent.js";
import Button from "./button.js";

class CheckBox extends Button {
  private _checked: boolean;

  private _backgroundUnhoveredUnchecked:
    | string
    | CanvasGradient
    | CanvasPattern;
  private _backgroundUnhoveredChecked: string | CanvasGradient | CanvasPattern;

  private _backgroundHoverUnchecked: string | CanvasGradient | CanvasPattern;
  private _backgroundHoverChecked: string | CanvasGradient | CanvasPattern;

  private _foregroundUnhoveredUnchecked:
    | string
    | CanvasGradient
    | CanvasPattern;
  private _foregroundUnhoveredChecked: string | CanvasGradient | CanvasPattern;

  private _foregroundHoverChecked: string | CanvasGradient | CanvasPattern;
  private _foregroundHoverUnchecked: string | CanvasGradient | CanvasPattern;

  private _borderUnhoveredChecked: string | CanvasGradient | CanvasPattern;
  private _borderUnhoveredUnchecked: string | CanvasGradient | CanvasPattern;

  private _borderHoverChecked: string | CanvasGradient | CanvasPattern;
  private _borderHoverUnchecked: string | CanvasGradient | CanvasPattern;

  private _textUnchecked: string;
  private _textChecked: string;

  public get checked(): boolean {
    return this._checked;
  }

  protected set checked(value: boolean) {
    this._checked = value;
  }

  public get backgroundUnhoveredUnchecked():
    | string
    | CanvasGradient
    | CanvasPattern {
    return this._backgroundUnhoveredUnchecked;
  }

  protected set backgroundUnhoveredUnchecked(
    value: string | CanvasGradient | CanvasPattern
  ) {
    this._backgroundUnhoveredUnchecked = value;
  }

  public get backgroundUnhoveredChecked():
    | string
    | CanvasGradient
    | CanvasPattern {
    return this._backgroundUnhoveredChecked;
  }

  protected set backgroundUnhoveredChecked(
    value: string | CanvasGradient | CanvasPattern
  ) {
    this._backgroundUnhoveredChecked = value;
  }

  public get backgroundHoverUnchecked():
    | string
    | CanvasGradient
    | CanvasPattern {
    return this._backgroundHoverUnchecked;
  }

  protected set backgroundHoverUnchecked(
    value: string | CanvasGradient | CanvasPattern
  ) {
    this._backgroundHoverUnchecked = value;
  }

  public get backgroundHoverChecked(): string | CanvasGradient | CanvasPattern {
    return this._backgroundHoverChecked;
  }

  protected set backgroundHoverChecked(
    value: string | CanvasGradient | CanvasPattern
  ) {
    this._backgroundHoverChecked = value;
  }

  public get foregroundUnhoveredUnchecked():
    | string
    | CanvasGradient
    | CanvasPattern {
    return this._foregroundUnhoveredUnchecked;
  }

  protected set foregroundUnhoveredUnchecked(
    value: string | CanvasGradient | CanvasPattern
  ) {
    this._foregroundUnhoveredUnchecked = value;
  }

  public get foregroundUnhoveredChecked():
    | string
    | CanvasGradient
    | CanvasPattern {
    return this._foregroundUnhoveredChecked;
  }

  protected set foregroundUnhoveredChecked(
    value: string | CanvasGradient | CanvasPattern
  ) {
    this._foregroundUnhoveredChecked = value;
  }

  public get foregroundHoverUnchecked():
    | string
    | CanvasGradient
    | CanvasPattern {
    return this._foregroundHoverUnchecked;
  }

  protected set foregroundHoverUnchecked(
    value: string | CanvasGradient | CanvasPattern
  ) {
    this._foregroundHoverUnchecked = value;
  }

  public get foregroundHoverChecked(): string | CanvasGradient | CanvasPattern {
    return this._foregroundHoverChecked;
  }

  protected set foregroundHoverChecked(
    value: string | CanvasGradient | CanvasPattern
  ) {
    this._foregroundHoverChecked = value;
  }

  public get borderUnhoveredUnchecked():
    | string
    | CanvasGradient
    | CanvasPattern {
    return this._borderUnhoveredUnchecked;
  }

  protected set borderUnhoveredUnchecked(
    value: string | CanvasGradient | CanvasPattern
  ) {
    this._borderUnhoveredUnchecked = value;
  }

  public get borderUnhoveredChecked(): string | CanvasGradient | CanvasPattern {
    return this._borderUnhoveredChecked;
  }

  protected set borderUnhoveredChecked(
    value: string | CanvasGradient | CanvasPattern
  ) {
    this._borderUnhoveredChecked = value;
  }

  public get borderHoverUnchecked(): string | CanvasGradient | CanvasPattern {
    return this._borderHoverUnchecked;
  }

  protected set borderHoverUnchecked(
    value: string | CanvasGradient | CanvasPattern
  ) {
    this._borderHoverUnchecked = value;
  }

  public get borderHoverChecked(): string | CanvasGradient | CanvasPattern {
    return this._borderHoverChecked;
  }

  protected set borderHoverChecked(
    value: string | CanvasGradient | CanvasPattern
  ) {
    this._borderHoverChecked = value;
  }

  public get textUnchecked(): string {
    return this._textUnchecked;
  }

  protected set textUnchecked(value: string) {
    this._textUnchecked = value;
  }

  public get textChecked(): string {
    return this._textChecked;
  }

  protected set textChecked(value: string) {
    this._textChecked = value;
  }

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    backgroundUnhoveredUnchecked: string | CanvasGradient | CanvasPattern,
    backgroundUnhoveredChecked: string | CanvasGradient | CanvasPattern,
    backgroundHoverUnchecked: string | CanvasGradient | CanvasPattern,
    backgroundHoverChecked: string | CanvasGradient | CanvasPattern,
    foregroundUnhoveredUnchecked: string | CanvasGradient | CanvasPattern,
    foregroundUnhoveredChecked: string | CanvasGradient | CanvasPattern,
    foregroundHoverUnchecked: string | CanvasGradient | CanvasPattern,
    foregroundHoverChecked: string | CanvasGradient | CanvasPattern,
    borderUnchecked: string,
    borderChecked: string | CanvasGradient | CanvasPattern,
    borderHoverUnchecked: string,
    borderHoverChecked: string | CanvasGradient | CanvasPattern,
    borderSize: number,
    font: string,
    textAlign: CanvasTextAlign,
    textBaseline: CanvasTextBaseline,
    textUnchecked: string,
    textChecked: string,
    checked: boolean,
    visible: boolean
  ) {
    super(
      x,
      y,
      width,
      height,
      backgroundUnhoveredUnchecked,
      backgroundHoverUnchecked,
      foregroundUnhoveredUnchecked,
      foregroundHoverUnchecked,
      borderUnchecked,
      borderHoverUnchecked,
      borderSize,
      font,
      textAlign,
      textBaseline,
      textUnchecked,
      visible
    );

    this._backgroundUnhoveredUnchecked = backgroundUnhoveredUnchecked;
    this._backgroundHoverUnchecked = backgroundHoverUnchecked;
    this._foregroundUnhoveredUnchecked = foregroundUnhoveredUnchecked;
    this._foregroundHoverUnchecked = foregroundHoverUnchecked;
    this._borderUnhoveredUnchecked = borderUnchecked;
    this._borderHoverUnchecked = borderHoverUnchecked;
    this._textUnchecked = textUnchecked;

    this._backgroundUnhoveredChecked = backgroundUnhoveredChecked;
    this._backgroundHoverChecked = backgroundHoverChecked;
    this._foregroundUnhoveredChecked = foregroundUnhoveredChecked;
    this._foregroundHoverChecked = foregroundHoverChecked;
    this._borderUnhoveredChecked = borderChecked;
    this._borderHoverChecked = borderHoverChecked;
    this._textChecked = textChecked;

    this._checked = checked;
  }

  public toggle(): void {
    this.checked = !this.checked;
  }

  public update(): void {
    if (this.checked) {
      this.backgroundUnhovered = this.backgroundUnhoveredChecked;
      this.backgroundHover = this.backgroundHoverChecked;
      this.foregroundUnhovered = this.foregroundUnhoveredChecked;
      this.foregroundHover = this.foregroundHoverChecked;
      this.borderUnhovered = this.borderUnhoveredChecked;
      this.borderHover = this.borderHoverChecked;
      this.text = this.textChecked;
    } else {
      this.backgroundUnhovered = this.backgroundUnhoveredUnchecked;
      this.backgroundHover = this.backgroundHoverUnchecked;
      this.foregroundUnhovered = this.foregroundUnhoveredUnchecked;
      this.foregroundHover = this.foregroundHoverUnchecked;
      this.borderUnhovered = this.borderUnhoveredUnchecked;
      this.borderHover = this.borderHoverUnchecked;
      this.text = this.textUnchecked;
    }

    super.update();
  }
}

export default CheckBox;
