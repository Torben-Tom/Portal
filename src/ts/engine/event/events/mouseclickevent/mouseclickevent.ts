import Vector2D from "../../../math/vector2d.js";
import EngineEvent from "../../engineevent.js";
import MouseClickEventData from "./mouseclickeventdata.js";

class MouseClickEvent extends EngineEvent<MouseClickEventData> {
  constructor(
    locationRelative: Vector2D,
    mouseAbsolute: Vector2D,
    mouseButton: number
  ) {
    super(
      new MouseClickEventData(locationRelative, mouseAbsolute, mouseButton)
    );
  }
}

export default MouseClickEvent;
