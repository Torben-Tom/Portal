import Touch from "../../entitiy/touch.js";
import EngineEvent from "../engineevent.js";

class EntitiesCollideEvent extends EngineEvent<Touch> {
  constructor(eventData: Touch) {
    super(eventData);
  }
}

export default EntitiesCollideEvent;
