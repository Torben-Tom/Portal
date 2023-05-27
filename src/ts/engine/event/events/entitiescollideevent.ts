import Entity from "../../entitiy/entity.js";
import EngineEvent from "../engineevent.js";

class EntitiesCollideEvent extends EngineEvent<Entity[]> {
  constructor(entities: Entity[]) {
    super(entities);
  }
}

export default EntitiesCollideEvent;
