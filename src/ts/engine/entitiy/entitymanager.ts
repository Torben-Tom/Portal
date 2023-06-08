import EngineEventHandler from "../event/engineventhandler.js";
import EntitiesCollideEvent from "../event/events/entitiescollideevent.js";
import EntitiesTouchEvent from "../event/events/entitiestouchevent.js";
import EntitiesUncollideEvent from "../event/events/entitiesuncollideevent.js";
import EntitiesUntouchEvent from "../event/events/entitiesuntouchevent.js";
import Matrix2D from "../math/matrix2d.js";
import Polygon from "../math/polygon.js";
import Vector2D from "../math/vector2d.js";
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

  // private applyCollisionResponse() {
  //   for (let entity of this._entities) {
  //     if (entity.static) {
  //       continue;
  //     }

  //     let intersections: Polygon[] = [];
  //     for (let otherEntity of this._entities) {
  //       if (otherEntity === entity || otherEntity.boundingBox.passThrough) {
  //         continue;
  //       }

  //       let intersection = entity.boundingBox.intersect(
  //         otherEntity.boundingBox
  //       );
  //       if (intersection.points.length > 0) {
  //         intersections.push(intersection);
  //       }
  //     }

  //     let totalBottomIntersectionsWidth = 0;
  //     for (let intersection of intersections) {
  //       if (intersection.center.y > entity.boundingBox.center.y) {
  //         totalBottomIntersectionsWidth += intersection.width;
  //       }
  //     }
  //     let totalBottomIntersectionsWidthPercentage =
  //       (totalBottomIntersectionsWidth / entity.boundingBox.width) * 100;
  //     let outOfWallVelocities: Vector2D[] = [];
  //     let i = 0;
  //     for (let intersection of intersections) {
  //       i++;
  //       let intersectionCenter = intersection.center;
  //       let pushDirection = entity.boundingBox.center
  //         .subtract(intersectionCenter)
  //         .normalize();
  //       pushDirection = new Matrix2D(
  //         intersection.width,
  //         0,
  //         0,
  //         intersection.height
  //       ).multiplyVector(pushDirection);

  //       if (
  //         pushDirection.y < 0 &&
  //         totalBottomIntersectionsWidthPercentage > 25
  //       ) {
  //         pushDirection = new Matrix2D(
  //           0,
  //           0,
  //           0,
  //           intersection.height
  //         ).multiplyVector(pushDirection);
  //       }
  //       outOfWallVelocities.push(pushDirection);
  //     }

  //     let outOfWallVelocity = new Vector2D(0, 0);
  //     for (let velocity of outOfWallVelocities) {
  //       if (Math.abs(velocity.x) > Math.abs(outOfWallVelocity.x)) {
  //         outOfWallVelocity = new Vector2D(velocity.x, outOfWallVelocity.y);
  //       }
  //       if (Math.abs(velocity.y) > Math.abs(outOfWallVelocity.y)) {
  //         outOfWallVelocity = new Vector2D(outOfWallVelocity.x, velocity.y);
  //       }
  //     }
  //     entity.teleport(entity.location.add(outOfWallVelocity));
  //   }
  // }

  private applyCollisionResponse() {
    for (let entity of this._entities) {
      if (entity.static) {
        continue;
      }

      for (let otherEntity of this._entities) {
        if (entity === otherEntity || otherEntity.boundingBox.passThrough) {
          continue;
        }

        let intersection = entity.boundingBox.intersect(
          otherEntity.boundingBox
        );
        if (intersection.points.length == 0) {
          continue;
        }

        let center = entity.boundingBox.center;
        let iCenter = intersection.center;
        let xDiff = (center.x - iCenter.x) / Math.abs(center.x - iCenter.x);
        let yDiff = (center.y - iCenter.y) / Math.abs(center.y - iCenter.y);

        if (Number.isNaN(xDiff)) {
          xDiff = 1;
        }
        if (Number.isNaN(yDiff)) {
          yDiff = 1;
        }
        if (intersection.width == entity.boundingBox.width) {
          xDiff = 0;
        }
        if (intersection.height == entity.boundingBox.height) {
          yDiff = 0;
        }

        let direction: Vector2D;
        if (intersection.height !== 0 && intersection.width !== 0) {
          direction = new Matrix2D(xDiff, 0, 0, yDiff).multiplyVector(
            new Vector2D(intersection.width, intersection.height)
          );
        } else {
          direction = new Vector2D(0, 0);
        }

        //console.log(`Center ${center.x} ${center.y}`);
        //console.log(`iCenter ${iCenter.x} ${iCenter.y}`);
        //console.log(direction);
        entity.teleport(entity.location.add(direction));
      }
    }
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
