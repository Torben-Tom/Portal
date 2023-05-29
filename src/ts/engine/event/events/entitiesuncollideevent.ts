import Touch from "../../entitiy/touch.js";
import EngineEvent from "../engineevent.js";

class EntitiesUncollideEvent extends EngineEvent<Touch> {
  constructor(eventData: Touch) {
    super(eventData);
  }
}

export default EntitiesUncollideEvent;
