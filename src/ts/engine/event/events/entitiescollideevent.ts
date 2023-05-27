import Collision from "../../entitiy/collision.js";
import EngineEvent from "../engineevent.js";

class EntitiesCollideEvent extends EngineEvent<Collision> {
  constructor(eventData: Collision) {
    super(eventData);
  }
}

export default EntitiesCollideEvent;
