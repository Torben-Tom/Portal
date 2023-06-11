import MouseButton from "../../../input/mousebutton.js";
import Vector2D from "../../../math/vector2d.js";

class MouseClickEventData {
  private _locationRelative: Vector2D;
  private _locationAbsolute: Vector2D;
  private _mouseButton: MouseButton;

  get locationRelative(): Vector2D {
    return this._locationRelative;
  }

  get locationAbsolute(): Vector2D {
    return this._locationAbsolute;
  }

  get mouseButton(): MouseButton {
    return this._mouseButton;
  }

  constructor(
    locationRelative: Vector2D,
    locationAbsolute: Vector2D,
    mouseButton: MouseButton
  ) {
    this._locationRelative = locationRelative;
    this._locationAbsolute = locationAbsolute;
    this._mouseButton = mouseButton;
  }
}

export default MouseClickEventData;
