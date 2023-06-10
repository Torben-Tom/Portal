import AssetManager from "../../engine/assets/assetmanager.js";
import ConditionalTexture from "../../engine/assets/texture/conditionaltexture.js";
import Texture from "../../engine/assets/texture/texture.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";
import EntityManager from "../../engine/entitiy/entitymanager.js";
import MovingEntity from "../../engine/entitiy/movingentity.js";
import EntitiesCollideEvent from "../../engine/event/events/entitiescollideevent.js";
import Vector2D from "../../engine/math/vector2d.js";
import PlayerEntity from "./playerentity.js";
import PortalType from "./portaltype.js";

class PortalEntity extends Entity {
  private _portalType: PortalType;
  private _destinationOffset: Vector2D;
  private _destination: PortalEntity | null;
  private _entitiesOnCooldown: Entity[];
  private _entityManager: EntityManager;

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
      0,
      0,
      0,
      scalingX,
      scalingY,
      widthExpansion,
      heightExpansion,
      true,
      portalType === PortalType.GREEN
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
    this._entityManager.touchEvent.subscribe((engineEvent) =>
      this.onTouch(engineEvent)
    );
  }

  public onCooldown(entity: Entity): boolean {
    return this._entitiesOnCooldown.includes(entity);
  }

  private onTouch(entitiesCollideEvent: EntitiesCollideEvent): void {
    if (
      this._destination &&
      entitiesCollideEvent.eventData.belongsToEntity(this) &&
      entitiesCollideEvent.eventData.belongsToType(MovingEntity)
    ) {
      let movingEntity =
        entitiesCollideEvent.eventData.getEntityOfType(MovingEntity)!;

      if (!this.onCooldown(movingEntity)) {
        movingEntity.teleport(
          this._destination.boundingBox.centerAbsolute
            .add(this._destination.destinationOffset)
            .subtract(movingEntity.boundingBox.centerRelative)
        );
        this.applyCooldown(movingEntity, 1000);
      }
    }
  }

  private applyCooldown(
    entity: Entity,
    cooldown: number,
    synchronizeDestination: boolean = true
  ): void {
    this._entitiesOnCooldown.push(entity);
    setTimeout(
      () =>
        this._entitiesOnCooldown.splice(
          this._entitiesOnCooldown.indexOf(entity),
          1
        ),
      cooldown
    );
    if (synchronizeDestination && this._destination) {
      this._destination.applyCooldown(entity, cooldown, false);
    }
  }

  private findDestinationOffset(): Vector2D {
    return new Vector2D(0, 0);
  }
}

export default PortalEntity;
