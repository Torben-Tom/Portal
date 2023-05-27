import Entity from "./entity.js";
class EntityManager {
  //List of all entities
  private _entities: Entity[];

  get entities(): Entity[] {
    return this._entities;
  }

  constructor() {
    this._entities = [];
  }

  register(entity: Entity) {
    this._entities.push(entity);
  }

  unregister(entity: Entity) {
    const index = this._entities.indexOf(entity);
    if (index >= 0) {
      this._entities.splice(index, 1);
    }
  }

  update(delta: number) {
    this._entities.forEach((entity) => {
      entity.update(delta);
    });
  }
}

export default EntityManager;
