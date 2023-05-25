class InputHandler {
  private _htmlCanvasElement: HTMLCanvasElement;
  private _mouseX: number;
  private _mouseY: number;
  private _pressedKeys: Map<string, boolean>;
  private _whiteListedKeys: string[];

  get mouseAbsoluteX(): number {
    return this._mouseX;
  }

  get mouseAbsoluteY(): number {
    return this._mouseY;
  }

  get mouseRelativeX(): number {
    return Math.floor(
      this._mouseX - this._htmlCanvasElement.getBoundingClientRect().left
    );
  }

  get mouseRelativeY(): number {
    return Math.floor(
      this._mouseY - this._htmlCanvasElement.getBoundingClientRect().top
    );
  }

  constructor(htmlCanvasElement: HTMLCanvasElement) {
    this._htmlCanvasElement = htmlCanvasElement;
    this._mouseX = 0;
    this._mouseY = 0;
    this._pressedKeys = new Map<string, boolean>();
    this._whiteListedKeys = ["Alt", "F5"];

    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  private onMouseMove(mouseEvent: MouseEvent): void {
    this._mouseX = mouseEvent.clientX;
    this._mouseY = mouseEvent.clientY;
  }

  private onKeyDown(keyboardEvent: KeyboardEvent): void {
    if (!this._whiteListedKeys.includes(keyboardEvent.key)) {
      if (!this.isKeyDown(keyboardEvent.key)) {
        this._pressedKeys.set(keyboardEvent.key, true);
      }

      keyboardEvent.preventDefault();
    }
  }

  private onKeyUp(keyboardEvent: KeyboardEvent): void {
    if (!this._whiteListedKeys.includes(keyboardEvent.key)) {
      if (this.isKeyDown(keyboardEvent.key)) {
        this._pressedKeys.set(keyboardEvent.key, false);
      }

      keyboardEvent.preventDefault();
    }
  }

  public isKeyDown(key: string): boolean {
    return (this._pressedKeys.has(key) && this._pressedKeys.get(key)) ?? false;
  }
}

export default InputHandler;
