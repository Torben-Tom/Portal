import EngineEvent from "../event/engineevent.js";
import EngineEventHandler from "../event/engineventhandler.js";

class InputHandler {
  private _htmlCanvasElement: HTMLCanvasElement;
  private _mouseX: number;
  private _mouseY: number;
  private _pressedKeys: Map<string, boolean>;
  private _whiteListedKeys: string[];

  private _engineMouseMoveEvent: EngineEventHandler<
    MouseEvent,
    EngineEvent<MouseEvent>
  >;

  private _engineMouseClickEvent: EngineEventHandler<
    MouseEvent,
    EngineEvent<MouseEvent>
  >;

  private _engineKeyDownEvent: EngineEventHandler<
    KeyboardEvent,
    EngineEvent<KeyboardEvent>
  >;

  private _engineKeyUpEvent: EngineEventHandler<
    KeyboardEvent,
    EngineEvent<KeyboardEvent>
  >;

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

  get mouseMoveEvent(): EngineEventHandler<
    MouseEvent,
    EngineEvent<MouseEvent>
  > {
    return this._engineMouseMoveEvent;
  }

  get mouseClickEvent(): EngineEventHandler<
    MouseEvent,
    EngineEvent<MouseEvent>
  > {
    return this._engineMouseClickEvent;
  }

  get keyDownEvent(): EngineEventHandler<
    KeyboardEvent,
    EngineEvent<KeyboardEvent>
  > {
    return this._engineKeyDownEvent;
  }

  get keyUpEvent(): EngineEventHandler<
    KeyboardEvent,
    EngineEvent<KeyboardEvent>
  > {
    return this._engineKeyUpEvent;
  }

  constructor(htmlCanvasElement: HTMLCanvasElement) {
    this._htmlCanvasElement = htmlCanvasElement;
    this._mouseX = 0;
    this._mouseY = 0;
    this._pressedKeys = new Map<string, boolean>();
    this._whiteListedKeys = ["Alt", "F5"];

    this._engineMouseMoveEvent = new EngineEventHandler<
      MouseEvent,
      EngineEvent<MouseEvent>
    >();
    this._engineMouseClickEvent = new EngineEventHandler<
      MouseEvent,
      EngineEvent<MouseEvent>
    >();
    this._engineKeyDownEvent = new EngineEventHandler<
      KeyboardEvent,
      EngineEvent<KeyboardEvent>
    >();
    this._engineKeyUpEvent = new EngineEventHandler<
      KeyboardEvent,
      EngineEvent<KeyboardEvent>
    >();

    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("click", this.onMouseClick.bind(this));
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  private onMouseMove(mouseEvent: MouseEvent): void {
    this._mouseX = mouseEvent.clientX;
    this._mouseY = mouseEvent.clientY;
    this._engineMouseMoveEvent.dispatch(new EngineEvent(mouseEvent));
  }

  private onMouseClick(mouseEvent: MouseEvent): void {
    mouseEvent.preventDefault();
    this._engineMouseClickEvent.dispatch(new EngineEvent(mouseEvent));
  }

  private onKeyDown(keyboardEvent: KeyboardEvent): void {
    if (!this._whiteListedKeys.includes(keyboardEvent.key)) {
      if (!this.isKeyDown(keyboardEvent.key)) {
        this._pressedKeys.set(keyboardEvent.key, true);
      }

      keyboardEvent.preventDefault();
      this._engineKeyDownEvent.dispatch(new EngineEvent(keyboardEvent));
    }
  }

  private onKeyUp(keyboardEvent: KeyboardEvent): void {
    if (!this._whiteListedKeys.includes(keyboardEvent.key)) {
      if (this.isKeyDown(keyboardEvent.key)) {
        this._pressedKeys.set(keyboardEvent.key, false);
      }

      keyboardEvent.preventDefault();
      this._engineKeyUpEvent.dispatch(new EngineEvent(keyboardEvent));
    }
  }

  public isKeyDown(key: string): boolean {
    return (this._pressedKeys.has(key) && this._pressedKeys.get(key)) ?? false;
  }
}

export default InputHandler;
