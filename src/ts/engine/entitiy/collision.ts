import Entity from "./entity.js";

class Collision {
  private _entity1: Entity;
  private _entity2: Entity;

  get entity1(): Entity {
    return this._entity1;
  }

  get entity2(): Entity {
    return this._entity2;
  }

  constructor(entity1: Entity, entity2: Entity) {
    this._entity1 = entity1;
    this._entity2 = entity2;
  }

  public areEntities(entity1: Entity, entity2: Entity): boolean {
    return (
      (this._entity1 === entity1 && this._entity2 === entity2) ||
      (this._entity1 === entity2 && this._entity2 === entity1)
    );
  }
}

export default Collision;
