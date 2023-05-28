import EngineEventHandler from "../event/engineventhandler.js";
import EntitiesCollideEvent from "../event/events/entitiescollideevent.js";
import BoundingBox from "./boundingbox.js";
import Collision from "./collision.js";
import Entity from "./entity.js";
class EntityManager {
  private _entities: Entity[];
  private _collisions: Collision[];
  private _collisionEvent: EngineEventHandler<Collision, EntitiesCollideEvent>;

  get entities(): Entity[] {
    return this._entities;
  }

  get collisions(): Collision[] {
    return this._collisions;
  }

  get collisionEvent(): EngineEventHandler<Collision, EntitiesCollideEvent> {
    return this._collisionEvent;
  }

  constructor() {
    this._entities = [];
    this._collisions = [];
    this._collisionEvent = new EngineEventHandler<
      Collision,
      EntitiesCollideEvent
    >();
  }

  public register(entity: Entity) {
    this._entities.push(entity);
  }

  public registerAll(entities: Entity[]) {
    for (let entity of entities) {
      this.register(entity);
    }
  }

  public unregister(entity: Entity) {
    const index = this._entities.indexOf(entity);
    if (index >= 0) {
      this._entities.splice(index, 1);
    }

    for (let collision of this._collisions) {
      if (collision.entity1 === entity || collision.entity2 === entity) {
        this._collisions.splice(this._collisions.indexOf(collision), 1);
      }
    }
  }

  public unregisterAll(entities: Entity[]) {
    for (let entity of entities) {
      this.unregister(entity);
    }
  }

  public clear() {
    this._entities = [];
    this._collisions = [];
  }

  public getCollision(entity1: Entity, entity2: Entity): Collision | null {
    for (let collision of this._collisions) {
      if (collision.belongsTo(entity1, entity2)) {
        return collision;
      }
    }

    return null;
  }

  public areColliding(entity1: Entity, entity2: Entity): boolean {
    return this.getCollision(entity1, entity2) !== null;
  }

  public getCollisions(entity: Entity): Collision[] {
    let collisions: Collision[] = [];

    for (let collision of this._collisions) {
      if (collision.entity1 === entity || collision.entity2 === entity) {
        collisions.push(collision);
      }
    }

    return collisions;
  }

  public isColliding(entity: Entity): boolean {
    return this.getCollisions(entity).length > 0;
  }

  public update(delta: number) {
    for (let entity of this._entities) {
      entity.update(delta);

      if (entity.boundingBox === null) {
        continue;
      }

      for (let otherEntity of this._entities) {
        if (otherEntity === entity || otherEntity.boundingBox === null) {
          continue;
        }

        let boundingBox: BoundingBox = entity.boundingBox;
        let otherBoundingBox: BoundingBox = otherEntity.boundingBox;

        if (boundingBox.collidesWith(otherBoundingBox)) {
          let exists = false;
          for (let collision of this._collisions) {
            if (collision.belongsTo(entity, otherEntity)) {
              exists = true;
              break;
            }
          }

          if (!exists) {
            this._collisions.push(new Collision(entity, otherEntity));
            this._collisionEvent.dispatch(
              new EntitiesCollideEvent(new Collision(entity, otherEntity))
            );
          }
        }
      }
    }

    for (let collision of this._collisions) {
      if (
        !collision.entity1.boundingBox ||
        !collision.entity2.boundingBox ||
        !collision.entity1.boundingBox.collidesWith(
          collision.entity2.boundingBox
        )
      ) {
        this._collisions.splice(this._collisions.indexOf(collision), 1);
      }
    }
  }
}

export default EntityManager;
