import AssetManager from "../../engine/assets/assetmanager.js";
import ConditionalTexture from "../../engine/assets/texture/conditionaltexture.js";
import Texture from "../../engine/assets/texture/texture.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";
import EntityManager from "../../engine/entitiy/entitymanager.js";
import EntitiesCollideEvent from "../../engine/event/events/entitiescollideevent.js";
import Vector2D from "../../engine/math/vector2d.js";
import PlayerEntity from "./playerentity.js";
import PortalType from "./portaltype.js";

class PortalEntity extends Entity {
  private _portalType: PortalType;
  private _destinationOffset: Vector2D;
  private _destination: PortalEntity | null;
  private _onCooldown: boolean;
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

  get onCooldown(): boolean {
    return this._onCooldown;
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
    this._onCooldown = false;
    this._entityManager = Services.resolve<EntityManager>("EntityManager");
    this._entityManager.touchEvent.subscribe((engineEvent) =>
      this.onTouch(engineEvent)
    );
  }

  private onTouch(entitiesCollideEvent: EntitiesCollideEvent): void {
    if (
      this._destination &&
      !this._onCooldown &&
      entitiesCollideEvent.eventData.belongsToEntity(this) &&
      entitiesCollideEvent.eventData.belongsToType(PlayerEntity)
    ) {
      let playerEntity =
        entitiesCollideEvent.eventData.getEntityOfType(PlayerEntity)!;

      playerEntity.teleport(
        this._destination.boundingBox.center.add(
          this._destination.destinationOffset
        )
      );
      this.applyCooldown(100);
    }
  }

  private applyCooldown(
    cooldown: number,
    synchronizeDestination: boolean = true
  ): void {
    this._onCooldown = true;
    setTimeout(() => (this._onCooldown = false), cooldown);
    if (synchronizeDestination && this._destination) {
      this._destination.applyCooldown(cooldown, false);
    }
  }

  private findDestinationOffset(): Vector2D {
    return new Vector2D(0, 0);
  }
}

export default PortalEntity;
