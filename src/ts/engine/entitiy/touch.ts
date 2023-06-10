import Entity from "./entity.js";

class Touch {
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

  public belongsToEntity(entity: Entity): boolean {
    return this._entity1 === entity || this._entity2 === entity;
  }

  public belongsToEntities(entity1: Entity, entity2: Entity): boolean {
    return (
      (this._entity1 === entity1 && this._entity2 === entity2) ||
      (this._entity1 === entity2 && this._entity2 === entity1)
    );
  }

  public belongsToType(type: typeof Entity) {
    return this._entity1 instanceof type || this._entity2 instanceof type;
  }

  public getEntityOfType(type: typeof Entity): Entity | null {
    if (this._entity1 instanceof type) {
      return this._entity1;
    } else if (this._entity2 instanceof type) {
      return this._entity2;
    } else {
      return null;
    }
  }
}

export default Touch;
