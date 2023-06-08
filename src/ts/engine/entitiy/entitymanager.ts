import EngineEventHandler from "../event/engineventhandler.js";
import EntitiesCollideEvent from "../event/events/entitiescollideevent.js";
import EntitiesTouchEvent from "../event/events/entitiestouchevent.js";
import EntitiesUncollideEvent from "../event/events/entitiesuncollideevent.js";
import EntitiesUntouchEvent from "../event/events/entitiesuntouchevent.js";
import Entity from "./entity.js";
import Touch from "./touch.js";
class EntityManager {
  private _entities: Entity[];
  private _touches: Touch[];
  private _collisions: Touch[];
  private _touchEvent: EngineEventHandler<Touch, EntitiesTouchEvent>;
  private _untouchEvent: EngineEventHandler<Touch, EntitiesUntouchEvent>;
  private _collideEvent: EngineEventHandler<Touch, EntitiesCollideEvent>;
  private _uncollideEvent: EngineEventHandler<Touch, EntitiesUncollideEvent>;

  get entities(): Entity[] {
    return this._entities;
  }

  get touches(): Touch[] {
    return this._touches;
  }

  get collisions(): Touch[] {
    return this._collisions;
  }

  get touchEvent(): EngineEventHandler<Touch, EntitiesTouchEvent> {
    return this._touchEvent;
  }

  get untouchEvent(): EngineEventHandler<Touch, EntitiesUntouchEvent> {
    return this._untouchEvent;
  }

  get collideEvent(): EngineEventHandler<Touch, EntitiesCollideEvent> {
    return this._collideEvent;
  }

  get uncollideEvent(): EngineEventHandler<Touch, EntitiesUncollideEvent> {
    return this._uncollideEvent;
  }

  constructor() {
    this._entities = [];
    this._touches = [];
    this._collisions = [];
    this._touchEvent = new EngineEventHandler<Touch, EntitiesTouchEvent>();
    this._untouchEvent = new EngineEventHandler<Touch, EntitiesUntouchEvent>();
    this._collideEvent = new EngineEventHandler<Touch, EntitiesCollideEvent>();
    this._uncollideEvent = new EngineEventHandler<
      Touch,
      EntitiesUncollideEvent
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

    this.cleanupTouches();
    this.cleanupCollisions();
  }

  public unregisterAll(entities: Entity[]) {
    for (let entity of entities) {
      this.unregister(entity);
    }
  }

  public clear() {
    this._entities = [];
    this.cleanupTouches();
    this.cleanupCollisions();
  }

  public getTouches(entity: Entity): Touch[] {
    return this._touches.filter((touch) => touch.belongsToEntity(entity));
  }

  public getTouch(entity1: Entity, entity2: Entity): Touch | null {
    return (
      this._touches.filter((touch) =>
        touch.belongsToEntities(entity1, entity2)
      )[0] || null
    );
  }

  public areTouching(entity1: Entity, entity2: Entity): boolean {
    return this.getTouch(entity1, entity2) !== null;
  }

  public isTouching(entity: Entity): boolean {
    return this.getTouches(entity).length > 0;
  }

  public getCollisions(entity: Entity): Touch[] {
    return this._collisions.filter((touch) => touch.belongsToEntity(entity));
  }

  public getCollision(entity1: Entity, entity2: Entity): Touch | null {
    return (
      this._collisions.filter((touch) =>
        touch.belongsToEntities(entity1, entity2)
      )[0] || null
    );
  }

  public areColliding(entity1: Entity, entity2: Entity): boolean {
    return this.getCollision(entity1, entity2) !== null;
  }

  public isColliding(entity: Entity): boolean {
    return this.getCollisions(entity).length > 0;
  }

  private checkTouch(entity1: Entity, entity2: Entity) {
    if (
      !this.areTouching(entity1, entity2) &&
      entity1.boundingBox.intersect(entity2.boundingBox).points.length > 0
    ) {
      this._touches.push(new Touch(entity1, entity2));
      this._touchEvent.dispatch(
        new EntitiesTouchEvent(new Touch(entity1, entity2))
      );
    }
  }

  private checkCollision(entity1: Entity, entity2: Entity) {
    if (
      !this.areColliding(entity1, entity2) &&
      !entity1.boundingBox.passThrough &&
      !entity2.boundingBox.passThrough &&
      entity1.boundingBox.intersect(entity2.boundingBox).points.length > 0
    ) {
      this._collisions.push(new Touch(entity1, entity2));
      this._collideEvent.dispatch(
        new EntitiesCollideEvent(new Touch(entity1, entity2))
      );
    }
  }

  private cleanupTouches() {
    for (let touch of this._touches) {
      if (
        this._entities.indexOf(touch.entity1) < 0 ||
        this._entities.indexOf(touch.entity2) < 0 ||
        touch.entity1.boundingBox.intersect(touch.entity2.boundingBox).points
          .length == 0
      ) {
        this._touches.splice(this._touches.indexOf(touch), 1);
        this._untouchEvent.dispatch(new EntitiesUntouchEvent(touch));
      }
    }
  }

  private cleanupCollisions() {
    for (let touch of this._collisions) {
      if (
        this._entities.indexOf(touch.entity1) < 0 ||
        this._entities.indexOf(touch.entity2) < 0 ||
        touch.entity1.boundingBox.passThrough ||
        touch.entity2.boundingBox.passThrough ||
        touch.entity1.boundingBox.intersect(touch.entity2.boundingBox).points
          .length == 0
      ) {
        this._collisions.splice(this._collisions.indexOf(touch), 1);
        this._uncollideEvent.dispatch(new EntitiesUncollideEvent(touch));
      }
    }
  }

  private applyCollisionResponse() {
    // for (let entity of this._entities) {
    //   if (entity.static) {
    //     continue;
    //   }
    //   let intersections: Polygon[] = [];
    //   for (let otherEntity of this._entities) {
    //     if (otherEntity === entity || otherEntity.boundingBox.passThrough) {
    //       continue;
    //     }
    //     if (entity.boundingBox.touches(otherEntity.boundingBox)) {
    //       intersections.push(
    //         entity.boundingBox.intersect(otherEntity.boundingBox)
    //       );
    //     }
    //   }
    //   let totalBottomIntersectionsWith = 0;
    //   for (let intersection of intersections) {
    //     if (intersection.center.y > entity.boundingBox.center.y) {
    //       totalBottomIntersectionsWith += intersection.width;
    //     }
    //   }
    //   let totalBottomIntersectionsWithPercentage =
    //     (totalBottomIntersectionsWith / entity.boundingBox.width) * 100;
    //   let outOfWallVelocities: Vector2D[] = [];
    //   let i = 0;
    //   for (let intersection of intersections) {
    //     i++;
    //     let intersectionCenter = intersection.center;
    //     let pushDirection = entity.boundingBox.center
    //       .subtract(intersectionCenter)
    //       .normalize()
    //       .multiply(new Vector2D(intersection.width, 1))
    //       .multiply(new Vector2D(1, intersection.height));
    //     if (
    //       pushDirection.y < 0 &&
    //       totalBottomIntersectionsWithPercentage > 25
    //     ) {
    //       pushDirection = pushDirection.multiply(new Vector2D(0, 1));
    //     }
    //     outOfWallVelocities.push(pushDirection);
    //   }
    //   let outOfWallVelocity = new Vector2D(0, 0);
    //   for (let velocity of outOfWallVelocities) {
    //     if (Math.abs(velocity.x) > Math.abs(outOfWallVelocity.x)) {
    //       outOfWallVelocity = new Vector2D(velocity.x, outOfWallVelocity.y);
    //     }
    //     if (Math.abs(velocity.y) > Math.abs(outOfWallVelocity.y)) {
    //       outOfWallVelocity = new Vector2D(outOfWallVelocity.x, velocity.y);
    //     }
    //   }
    //   entity.teleport(entity.location.add(outOfWallVelocity));
    // }
  }

  public update(tickDelta: number) {
    for (let entity of this._entities) {
      entity.update(tickDelta);

      for (let otherEntity of this._entities) {
        if (otherEntity === entity) {
          continue;
        }

        this.checkTouch(entity, otherEntity);
        this.checkCollision(entity, otherEntity);
      }
    }
    this.cleanupTouches();
    this.cleanupCollisions();

    this.applyCollisionResponse();
  }
}

export default EntityManager;
