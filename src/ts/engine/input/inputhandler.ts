import EngineEvent from "../event/engineevent.js";
import EngineEventHandler from "../event/engineventhandler.js";
import KeyBoardEvent from "../event/events/keyboardevent/keyboardevent.js";
import KeyBoardEventData from "../event/events/keyboardevent/keyboardeventdata.js";
import MouseClickEvent from "../event/events/mouseclickevent/mouseclickevent.js";
import MouseClickEventData from "../event/events/mouseclickevent/mouseclickeventdata.js";
import Vector2D from "../math/vector2d.js";

class InputHandler {
  private _htmlCanvasElement: HTMLCanvasElement;
  private _mouseLocation: Vector2D;
  private _keystates: Map<string, boolean>;
  private _whiteListedKeys: string[];

  private _engineMouseMoveEvent: EngineEventHandler<
    MouseEvent,
    EngineEvent<MouseEvent>
  >;

  private _engineMouseClickEvent: EngineEventHandler<
    MouseClickEventData,
    MouseClickEvent
  >;

  private _engineKeyDownEvent: EngineEventHandler<
    KeyBoardEventData,
    KeyBoardEvent
  >;

  private _engineKeyUpEvent: EngineEventHandler<
    KeyBoardEventData,
    KeyBoardEvent
  >;

  get mouseAbsolute(): Vector2D {
    return this._mouseLocation;
  }

  get mouseRelative(): Vector2D {
    let boundingClientRect = this._htmlCanvasElement.getBoundingClientRect();
    let canvasLeft = boundingClientRect.left;
    let canvasTop = boundingClientRect.top;
    let canvasWidth = this._htmlCanvasElement.scrollWidth;
    let canvasHeight = this._htmlCanvasElement.scrollHeight;
    let canvasScaleX = this._htmlCanvasElement.width / canvasWidth;
    let canvasScaleY = this._htmlCanvasElement.height / canvasHeight;

    let relativeX = (this._mouseLocation.x - canvasLeft) / (1 / canvasScaleX);
    let relativeY = (this._mouseLocation.y - canvasTop) / (1 / canvasScaleY);

    return new Vector2D(relativeX, relativeY);
  }

  get keystates(): Map<string, boolean> {
    return this._keystates;
  }

  get whiteListedKeys(): string[] {
    return this._whiteListedKeys;
  }

  get mouseMoveEvent(): EngineEventHandler<
    MouseEvent,
    EngineEvent<MouseEvent>
  > {
    return this._engineMouseMoveEvent;
  }

  get mouseClickEvent(): EngineEventHandler<
    MouseClickEventData,
    MouseClickEvent
  > {
    return this._engineMouseClickEvent;
  }

  get keyDownEvent(): EngineEventHandler<KeyBoardEventData, KeyBoardEvent> {
    return this._engineKeyDownEvent;
  }

  get keyUpEvent(): EngineEventHandler<KeyBoardEventData, KeyBoardEvent> {
    return this._engineKeyUpEvent;
  }

  constructor(htmlCanvasElement: HTMLCanvasElement) {
    this._htmlCanvasElement = htmlCanvasElement;
    this._mouseLocation = new Vector2D(0, 0);
    this._keystates = new Map<string, boolean>();
    this._whiteListedKeys = [];

    this._engineMouseMoveEvent = new EngineEventHandler<
      MouseEvent,
      EngineEvent<MouseEvent>
    >();
    this._engineMouseClickEvent = new EngineEventHandler<
      MouseClickEventData,
      MouseClickEvent
    >();
    this._engineKeyDownEvent = new EngineEventHandler<
      KeyBoardEventData,
      KeyBoardEvent
    >();
    this._engineKeyUpEvent = new EngineEventHandler<
      KeyBoardEventData,
      KeyBoardEvent
    >();

    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("click", this.onMouseClick.bind(this));
    window.addEventListener("contextmenu", this.onMouseClick.bind(this));
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  private onMouseMove(mouseEvent: MouseEvent): void {
    this._mouseLocation = new Vector2D(mouseEvent.clientX, mouseEvent.clientY);
    this._engineMouseMoveEvent.dispatch(new EngineEvent(mouseEvent));
  }

  private onMouseClick(mouseEvent: MouseEvent): void {
    mouseEvent.preventDefault();
    this._engineMouseClickEvent.dispatch(
      new MouseClickEvent(
        this.mouseRelative,
        this.mouseAbsolute,
        mouseEvent.button
      )
    );
  }

  private onKeyDown(keyboardEvent: KeyboardEvent): void {
    let key = keyboardEvent.key.toLowerCase();
    if (!this._whiteListedKeys.includes(key)) {
      if (!this.isKeyDown(key)) {
        this._keystates.set(key, true);
      }
      keyboardEvent.preventDefault();
      this._engineKeyDownEvent.dispatch(new KeyBoardEvent(key));
    }
  }

  private onKeyUp(keyboardEvent: KeyboardEvent): void {
    let key = keyboardEvent.key.toLowerCase();
    if (!this._whiteListedKeys.includes(key)) {
      if (this.isKeyDown(key)) {
        this._keystates.set(key, false);
      }

      keyboardEvent.preventDefault();
      this._engineKeyUpEvent.dispatch(new KeyBoardEvent(key));
    }
  }

  public isKeyDown(key: string): boolean {
    return (this._keystates.has(key) && this._keystates.get(key)) ?? false;
  }

  public addWhiteListedKey(key: string): void {
    if (!this._whiteListedKeys.includes(key)) {
      this._whiteListedKeys.push(key);
    }
  }

  public addWhiteListedKeys(keys: string[]): void {
    keys.forEach((key) => {
      this.addWhiteListedKey(key);
    });
  }

  public removeWhiteListedKey(key: string): void {
    let index = this._whiteListedKeys.indexOf(key);
    if (index >= 0) {
      this._whiteListedKeys.splice(index, 1);
    }
  }

  public removeWhiteListedKeys(keys: string[]): void {
    keys.forEach((key) => {
      this.removeWhiteListedKey(key);
    });
  }
}

export default InputHandler;
