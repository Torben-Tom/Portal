import EngineEvent from "../engineevent.js";
import Touch from "../../entitiy/touch.js";

class EntitiesTouchEvent extends EngineEvent<Touch> {
  constructor(eventData: Touch) {
    super(eventData);
  }
}

export default EntitiesTouchEvent;
