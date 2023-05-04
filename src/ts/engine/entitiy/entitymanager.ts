import Entity from "./entity";
class EntityManager {
  //List of all entities
  entities: Entity[];

  constructor() {
    this.entities = [];
  }

  register(entity: Entity) {
    this.entities.push(entity);
  }

  unregister(entity: Entity) {
    const index = this.entities.indexOf(entity);
    if (index > -1) {
      this.entities.splice(index, 1);
    }
  }

  update() {
    this.entities.forEach((entity) => {
      entity.update();
    });
  }

  render() {
    this.entities.forEach((entity) => {
      entity.render();
    });
  }
}

export default EntityManager;
