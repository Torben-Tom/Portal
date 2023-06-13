import Vector2D from "../../../math/vector2d.js";
import CancellableEngineEvent from "../../cancellableengineeevent.js";
import MouseClickEventData from "./mouseclickeventdata.js";

class MouseClickEvent extends CancellableEngineEvent<MouseClickEventData> {
  constructor(
    mouseRelative: Vector2D,
    mouseAbsolute: Vector2D,
    mouseButton: number
  ) {
    super(new MouseClickEventData(mouseRelative, mouseAbsolute, mouseButton));
  }
}

export default MouseClickEvent;
