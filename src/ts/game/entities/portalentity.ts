import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";
import EntityManager from "../../engine/entitiy/entitymanager.js";
import MovingEntity from "../../engine/entitiy/movingentity.js";
import EntitiesCollideEvent from "../../engine/event/events/entitiescollideevent.js";
import EntitiesTouchEvent from "../../engine/event/events/entitiestouchevent.js";
import Vector2D from "../../engine/math/vector2d.js";
import PortalType from "./portaltype.js";

class PortalEntity extends Entity {
  private _portalType: PortalType;
  private _destinationOffset: Vector2D;
  private _destination: PortalEntity | null;
  private _entitiesOnCooldown: Entity[];
  private _entityManager: EntityManager;

  private _onTouchThis: (entitiesTouchEvent: EntitiesTouchEvent) => void;

  get portalType(): PortalType {
    return this._portalType;
  }

  get destination(): PortalEntity | null {
    return this._destination;
  }

  get destinationOffset(): Vector2D {
    return this._destinationOffset;
  }

  set destination(value: PortalEntity | null) {
    this._destination = value;
  }

  constructor(
    x: number,
    y: number,
    rotation: number,
    centerOfMassX: number,
    centerOfMassY: number,
    scalingX: number,
    scalingY: number,
    widthExpansion: number,
    heightExpansion: number,
    portalType: PortalType,
    destinationOffset: Vector2D | null
  ) {
    super(
      x,
      y,
      rotation,
      centerOfMassX,
      centerOfMassY,
      scalingX,
      scalingY,
      widthExpansion,
      heightExpansion,
      true,
      portalType === PortalType.Green
        ? Services.resolve<AssetManager>("AssetManager").getTexture(
            "portalGreen"
          )
        : Services.resolve<AssetManager>("AssetManager").getTexture(
            "portalPurple"
          )
    );

    this._portalType = portalType;
    this._destinationOffset = destinationOffset || this.findDestinationOffset();
    this._destination = null;
    this._entitiesOnCooldown = [];
    this._entityManager = Services.resolve<EntityManager>("EntityManager");
    this._onTouchThis = this.onTouch.bind(this);
  }

  public load() {
    this._entityManager.touchEvent.subscribe(this._onTouchThis);
  }

  public unload(): void {
    this._entityManager.touchEvent.unsubscribe(this._onTouchThis);

    for (let entity of this._entityManager.entities) {
      if (
        entity !== this &&
        entity instanceof PortalEntity &&
        entity.destination === this
      ) {
        entity.destination = null;
      }
    }
  }

  public onCooldown(entity: Entity): boolean {
    return this._entitiesOnCooldown.includes(entity);
  }

  private onTouch(entitiesTouchEvent: EntitiesTouchEvent): void {
    if (
      this._destination &&
      entitiesTouchEvent.eventData.belongsToEntity(this) &&
      entitiesTouchEvent.eventData.belongsToType(MovingEntity)
    ) {
      let movingEntity =
        entitiesTouchEvent.eventData.getEntityOfType(MovingEntity)!;
      if (!this.onCooldown(movingEntity)) {
        this._destination.teleportHere(movingEntity);
      }
    }
  }

  private applyCooldown(entity: Entity, cooldown: number): void {
    this._entitiesOnCooldown.push(entity);
    setTimeout(
      () =>
        this._entitiesOnCooldown.splice(
          this._entitiesOnCooldown.indexOf(entity),
          1
        ),
      cooldown
    );
  }

  private findDestinationOffset(): Vector2D {
    return new Vector2D(0, 0);
  }

  public teleportHere(entity: Entity): void {
    if (!this.onCooldown(entity)) {
      this.applyCooldown(entity, 1000);
      console.log("teleporting entity to portal destination");

      let degrees = this._rotation;
      let portalCenter = this.centerOfMassAbsolute.add(
        this.boundingBox.centerAbsolute
          .subtract(this.centerOfMassAbsolute)
          .rotateDegrees(degrees)
      );
      let destinationOffset = this.destinationOffset.rotateDegrees(degrees);

      let boundingBoxOffset = entity.boundingBox.centerRelative;

      let radians = degrees * (Math.PI / 180);
      let sin = Math.sin(radians);
      let cos = Math.cos(radians);
      let widthFactor = cos * (entity.boundingBox.width / 2);
      let heightFactor = sin * (entity.boundingBox.height / 2);
      let antiClipOffset = new Vector2D(widthFactor, heightFactor);

      entity.teleport(
        portalCenter
          .add(destinationOffset)
          .subtract(boundingBoxOffset)
          .add(antiClipOffset)
      );
    }
  }
}

export default PortalEntity;
