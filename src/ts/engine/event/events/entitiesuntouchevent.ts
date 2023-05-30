import EngineEvent from "../engineevent.js";
import Touch from "../../entitiy/touch.js";

class EntitiesUntouchEvent extends EngineEvent<Touch> {
  constructor(eventData: Touch) {
    super(eventData);
  }
}

export default EntitiesUntouchEvent;
