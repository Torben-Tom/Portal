import PlayerEntity from "../../game/entities/playerentity.js";
import EngineEventHandler from "../event/engineventhandler.js";
import EntitiesCollideEvent from "../event/events/entitiescollideevent.js";
import EntitiesTouchEvent from "../event/events/entitiestouchevent.js";
import EntitiesUncollideEvent from "../event/events/entitiesuncollideevent.js";
import EntitiesUntouchEvent from "../event/events/entitiesuntouchevent.js";
import Direction from "../math/direction.js";
import Matrix2D from "../math/matrix2d.js";
import Polygon from "../math/polygon.js";
import Vector2D from "../math/vector2d.js";
import BoundingBox from "./boundingbox.js";
import Entity from "./entity.js";
import MovingEntity from "./movingentity.js";
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
    if (!this.areTouching(entity1, entity2)) {
      let location1 = entity1.boundingBox.centerAbsolute;
      let location2 = entity2.boundingBox.centerAbsolute;
      let widthSum = entity1.boundingBox.width + entity2.boundingBox.width;
      let heightSum = entity1.boundingBox.height + entity2.boundingBox.height;
      let maxRadius = Math.max(widthSum, heightSum);
      let xDiff = location1.x - location2.x;
      let yDiff = location1.y - location2.y;
      let distance = Math.hypot(xDiff, yDiff);

      if (
        distance <= maxRadius &&
        entity1.boundingBox.intersect(entity2.boundingBox).points.length > 0
      ) {
        this._touches.push(new Touch(entity1, entity2));
        this._touchEvent.dispatch(
          new EntitiesTouchEvent(new Touch(entity1, entity2))
        );
      }
    }
  }

  private checkCollision(entity1: Entity, entity2: Entity) {
    if (
      this.areTouching(entity1, entity2) &&
      !this.areColliding(entity1, entity2) &&
      !entity1.boundingBox.passThrough &&
      !entity2.boundingBox.passThrough
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
        !this._entities.includes(touch.entity1) ||
        !this._entities.includes(touch.entity2) ||
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
        !this._entities.includes(touch.entity1) ||
        !this._entities.includes(touch.entity2) ||
        touch.entity1.boundingBox.passThrough ||
        touch.entity2.boundingBox.passThrough ||
        !this.areTouching(touch.entity1, touch.entity2)
      ) {
        this._collisions.splice(this._collisions.indexOf(touch), 1);
        this._uncollideEvent.dispatch(new EntitiesUncollideEvent(touch));

        if (
          touch.entity1 instanceof MovingEntity &&
          !this.isColliding(touch.entity1)
        ) {
          touch.entity1.clearCollisions();
        }
        if (
          touch.entity2 instanceof MovingEntity &&
          !this.isColliding(touch.entity2)
        ) {
          touch.entity2.clearCollisions();
        }
      }
    }
  }

  private applyCollisionResponse() {
    for (let collision of this._collisions) {
      let entity = collision.entity1;
      let otherEntity = collision.entity2;

      let entityIsMovingEntity = entity instanceof MovingEntity;
      let otherEntityIsMovingEntity = otherEntity instanceof MovingEntity;
      if (!(entityIsMovingEntity || otherEntityIsMovingEntity)) {
        continue;
      }

      let movingEntities: MovingEntity[] = [];
      if (entityIsMovingEntity) {
        movingEntities.push(entity as MovingEntity);
      }
      if (otherEntityIsMovingEntity) {
        movingEntities.push(otherEntity as MovingEntity);
      }
      let bothEntitiesAreMovingEntities =
        entityIsMovingEntity && otherEntityIsMovingEntity;

      let intersection = entity.boundingBox.intersect(otherEntity.boundingBox);
      if (intersection.points.length === 0) {
        continue;
      }

      // let topIntersections: [MovingEntity, Polygon[]][] = movingEntities.map(
      //   (movingEntity) => [
      //     movingEntity,
      //     intersections.filter(
      //       (intersection) =>
      //         intersection.minY < movingEntity.boundingBox.centerAbsolute.y
      //     ),
      //   ]
      // );
      // let rightIntersections: [MovingEntity, Polygon[]][] = movingEntities.map(
      //   (movingEntity) => [
      //     movingEntity,
      //     intersections.filter(
      //       (intersection) =>
      //         intersection.maxX > movingEntity.boundingBox.centerAbsolute.x
      //     ),
      //   ]
      // );
      // let bottomIntersections: [MovingEntity, Polygon[]][] = movingEntities.map(
      //   (movingEntity) => [
      //     movingEntity,
      //     intersections.filter(
      //       (intersection) =>
      //         intersection.maxY > movingEntity.boundingBox.centerAbsolute.y
      //     ),
      //   ]
      // );
      // let leftIntersections: [MovingEntity, Polygon[]][] = movingEntities.map(
      //   (movingEntity) => [
      //     movingEntity,
      //     intersections.filter(
      //       (intersection) =>
      //         intersection.minX < movingEntity.boundingBox.centerAbsolute.x
      //     ),
      //   ]
      // );

      // let totalTopIntersectionsWidth: [MovingEntity, number][] =
      //   topIntersections.map(([movingEntity, intersections]) => [
      //     movingEntity,
      //     intersections.reduce(
      //       (sum, intersection) => sum + intersection.width,
      //       0
      //     ),
      //   ]);
      // let totalRightIntersectionsHeight: [MovingEntity, number][] =
      //   rightIntersections.map(([movingEntity, intersections]) => [
      //     movingEntity,
      //     intersections.reduce(
      //       (sum, intersection) => sum + intersection.height,
      //       0
      //     ),
      //   ]);
      // let totalBottomIntersectionsWidth: [MovingEntity, number][] =
      //   bottomIntersections.map(([movingEntity, intersections]) => [
      //     movingEntity,
      //     intersections.reduce(
      //       (sum, intersection) => sum + intersection.width,
      //       0
      //     ),
      //   ]);
      // let totalLeftIntersectionsHeight: [MovingEntity, number][] =
      //   leftIntersections.map(([movingEntity, intersections]) => [
      //     movingEntity,
      //     intersections.reduce(
      //       (sum, intersection) => sum + intersection.height,
      //       0
      //     ),
      //   ]);

      for (let movingEntity of movingEntities) {
        let boundingBox = movingEntity.boundingBox;

        let hasTopIntersection =
          intersection.minY < boundingBox.centerAbsolute.y;
        let hasRightIntersection =
          intersection.maxX > boundingBox.centerAbsolute.x;
        let hasBottomIntersection =
          intersection.maxY > boundingBox.centerAbsolute.y;
        let hasLeftIntersection =
          intersection.minX < boundingBox.centerAbsolute.x;

        let intersectionWidthPercentage =
          (intersection.width / movingEntity.boundingBox.width) * 100;
        let intersectionHeightPercentage =
          (intersection.height / movingEntity.boundingBox.height) * 100;

        let movingEntityCollisions = new Map<Direction, boolean>();
        if (hasTopIntersection && intersectionWidthPercentage > 25) {
          movingEntityCollisions.set(Direction.TOP, true);
        }
        if (hasRightIntersection && intersectionHeightPercentage > 25) {
          movingEntityCollisions.set(Direction.RIGHT, true);
        }
        if (hasBottomIntersection && intersectionWidthPercentage > 25) {
          movingEntityCollisions.set(Direction.BOTTOM, true);
        }
        if (hasLeftIntersection && intersectionHeightPercentage > 25) {
          movingEntityCollisions.set(Direction.LEFT, true);
        }

        let pushDirection = boundingBox.centerAbsolute
          .subtract(intersection.center)
          .normalize();

        if (
          movingEntityCollisions.get(Direction.TOP) ||
          movingEntityCollisions.get(Direction.BOTTOM)
        ) {
          pushDirection = Matrix2D.ignoreXMatrix.multiplyVector(pushDirection);
        }

        if (
          movingEntityCollisions.get(Direction.LEFT) ||
          movingEntityCollisions.get(Direction.RIGHT)
        ) {
          pushDirection = Matrix2D.ignoreYMatrix.multiplyVector(pushDirection);
        }

        pushDirection = pushDirection.multiplyScalar(
          (3 * intersection.width * intersection.height) / 100
        );

        movingEntity.addVelocity(pushDirection);

        for (let collision of movingEntityCollisions) {
          if (collision[1]) {
            if (
              bothEntitiesAreMovingEntities &&
              (collision[0] === Direction.LEFT ||
                collision[0] === Direction.RIGHT)
            ) {
              continue;
            }
            movingEntity.setColliding(collision[0], collision[1]);
          }
        }
      }
    }
  }

  public update(tickDelta: number) {
    for (let entity of this._entities) {
      entity.update(tickDelta);

      if (entity instanceof MovingEntity) {
        entity.clearCollisions();
      }

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
