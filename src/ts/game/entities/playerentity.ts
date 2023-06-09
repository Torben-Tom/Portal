import AssetManager from "../../engine/assets/assetmanager.js";
import ConditionalTexture from "../../engine/assets/texture/conditionaltexture.js";
import Texture from "../../engine/assets/texture/texture.js";
import Services from "../../engine/dependencyinjection/services.js";
import ComplexMovingEntity from "../../engine/entitiy/complexmovingentity.js";
import ComplexMovingEntityBuilder from "../../engine/entitiy/complexmovingentitybuilder.js";
import Entity from "../../engine/entitiy/entity.js";
import EntityManager from "../../engine/entitiy/entitymanager.js";
import MouseClickEvent from "../../engine/event/events/mouseclickevent/mouseclickevent.js";
import InputHandler from "../../engine/input/inputhandler.js";
import MouseButton from "../../engine/input/mousebutton.js";
import Direction from "../../engine/math/direction.js";
import Vector2D from "../../engine/math/vector2d.js";

import PortalEntity from "./portalentity.js";
import PortalType from "./portaltype.js";
import PlayerArm from "./playerarm.js";
import MovingEntity from "../../engine/entitiy/movingentity.js";

class PlayerEntity extends ComplexMovingEntity {
  private _inputHandler: InputHandler;
  private _entityManager: EntityManager;

  private _direction: Direction;
  private _portalGunEnabled: boolean;

  private _purplePortal: PortalEntity | null;
  private _greenPortal: PortalEntity | null;
  private _dateLastJump: number;

  private _onMouseClickThis: (mouseClickEvent: MouseClickEvent) => void;

  get portalGunEnabled(): boolean {
    return this._portalGunEnabled;
  }

  set portalGunEnabled(value: boolean) {
    this._portalGunEnabled = value;
  }

  get direction(): Direction {
    return this._direction;
  }

  constructor(x: number, y: number) {
    super(
      new ComplexMovingEntityBuilder(
        x,
        y,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        false,
        new ConditionalTexture(
          Services.resolve<AssetManager>("AssetManager").getTexture(
            "playerRunRight"
          ),
          new Map<Function, Texture>([
            [
              () => this._direction === Direction.Left && this.velocity.x > 0,
              Services.resolve<AssetManager>("AssetManager").getTexture(
                "playerRunLeftBackwords"
              ),
            ],
            [
              () => this._direction === Direction.Left,
              Services.resolve<AssetManager>("AssetManager").getTexture(
                "playerRunLeft"
              ),
            ],
            [
              () => this._direction === Direction.Right && this.velocity.x < 0,
              Services.resolve<AssetManager>("AssetManager").getTexture(
                "playerRunRightBackwords"
              ),
            ],
          ]),
          100
        )
      ).addPart(new Vector2D(-2, 1), new PlayerArm(0, 0, 0, 20, 30, 1, 1, 0, 0))
    );

    this._inputHandler = Services.resolve<InputHandler>("InputHandler");
    this._entityManager = Services.resolve<EntityManager>("EntityManager");

    this._direction = Direction.Right;
    this._portalGunEnabled = true;

    this._purplePortal = null;
    this._greenPortal = null;
    this._dateLastJump = Date.now();
    this._onMouseClickThis = this.onMouseClick.bind(this);
  }

  public load(): void {
    this._inputHandler.mouseClickEvent.subscribe(this._onMouseClickThis);
  }

  public unload(): void {
    this._inputHandler.mouseClickEvent.unsubscribe(this._onMouseClickThis);
  }

  public update(tickDelta: number): void {
    if (this._inputHandler) {
      this.handleMovement(tickDelta);
      this.handleArmRotation();
    }

    super.update(tickDelta);
  }

  private handleMovement(tickDelta: number) {
    if (this.collisions[Direction.Bottom]) {
      if (
        (this._inputHandler.isKeyDown("w") ||
          this._inputHandler.isKeyDown("arrowup") ||
          this._inputHandler.isKeyDown(" ")) &&
        Date.now() - this._dateLastJump >= 500
      ) {
        this.addVelocity(new Vector2D(0, -40));
        this.setColliding(Direction.Bottom, false);
        this._dateLastJump = Date.now();
      }
      if (
        this._inputHandler.isKeyDown("a") ||
        this._inputHandler.isKeyDown("arrowleft")
      ) {
        this.addVelocity(new Vector2D(-0.1 * tickDelta, 0));
      }
      if (
        this._inputHandler.isKeyDown("d") ||
        this._inputHandler.isKeyDown("arrowright")
      ) {
        this.addVelocity(new Vector2D(0.1 * tickDelta, 0));
      }
    }
  }

  private handleArmRotation() {
    let mouseLocation = this._inputHandler.mouseRelative;
    let armPart = this.parts[0][1] as PlayerArm;
    let degrees = armPart.centerOfMassAbsolute.degreesTo(mouseLocation) - 20;
    let previousDirection = this._direction;
    this._direction =
      degrees > 70 || degrees < -110 ? Direction.Left : Direction.Right;

    let isRight = this._direction === Direction.Right;
    armPart.rotate(isRight ? degrees : degrees + 200);
    if (previousDirection !== this._direction) {
      armPart.direction = this._direction;
      armPart.centerOfMass = isRight
        ? new Vector2D(20, 30)
        : new Vector2D(32, 30);
    }
  }

  private raycast(
    from: Vector2D,
    radians: number,
    precision: number
  ): [Vector2D, Entity] | null {
    let entities: Entity[] = this._entityManager.entities;

    //TODO: Do not hardcode limits
    let minX = 0;
    let maxX = 800;
    let minY = 0;
    let maxY = 600;
    while (
      from.x >= minX &&
      from.x <= maxX &&
      from.y >= minY &&
      from.y <= maxY
    ) {
      let relevantEntities = entities
        .filter(
          (entity) =>
            entity !== this &&
            !entity.boundingBox.passThrough &&
            !(entity instanceof MovingEntity)
        )
        .sort((a, b) =>
          a.boundingBox.centerAbsolute.subtract(from).length >=
          b.boundingBox.centerAbsolute.subtract(from).length
            ? 1
            : -1
        );

      for (let entity of relevantEntities) {
        if (entity !== this && !entity.boundingBox.passThrough) {
          if (entity.boundingBox.isInside(from)) {
            return [from, entity];
          }
        }
      }

      from = from.add(
        new Vector2D(0, 0).addDirectionRadians(radians, precision)
      );
    }

    return null;
  }

  private onMouseClick(mouseClickEvent: MouseClickEvent) {
    if (this._portalGunEnabled) {
      let armPart = this.parts[0][1];
      let armCenterOfMass = armPart.centerOfMassAbsolute;
      let mouseLocation = mouseClickEvent.eventData.locationRelative;
      let radians = armCenterOfMass.radiansTo(mouseLocation);
      let raycast = this.raycast(armCenterOfMass, radians, 1);
      if (raycast == null) {
        return;
      }

      let [location, entity] = raycast;

      for (let entity of this._entityManager.entities) {
        if (entity instanceof PortalEntity) {
          if (entity.boundingBox.isInside(location)) {
            return;
          }
        }
      }

      let boundingBox = entity.boundingBox;
      let topOfBoundingBox = boundingBox.location.y;
      let rightOfBoundingBox = boundingBox.location.x + boundingBox.width;
      let bottomOfBoundingBox = boundingBox.location.y + boundingBox.height;
      let leftOfBoundingBox = boundingBox.location.x;

      let topDiff = Math.abs(topOfBoundingBox - location.y);
      let rightDiff = Math.abs(rightOfBoundingBox - location.x);
      let bottomDiff = Math.abs(bottomOfBoundingBox - location.y);
      let leftDiff = Math.abs(leftOfBoundingBox - location.x);

      let degrees = 0;
      if (topDiff < rightDiff && topDiff < bottomDiff && topDiff < leftDiff) {
        degrees = 270;
      } else if (
        bottomDiff < topDiff &&
        bottomDiff < rightDiff &&
        bottomDiff < leftDiff
      ) {
        degrees = 90;
      } else if (
        leftDiff < topDiff &&
        leftDiff < rightDiff &&
        leftDiff < bottomDiff
      ) {
        degrees = 180;
      }
      //TODO: Workaround
      if (degrees === 90 || degrees === 270) {
        return;
      }
      let portalCenterOffset = new Vector2D(37.5, 81.25);
      if (degrees !== 0) {
        portalCenterOffset.rotateDegrees(degrees);
      }

      location = location.subtract(portalCenterOffset);

      if (mouseClickEvent.eventData.mouseButton === MouseButton.Left) {
        if (this._purplePortal) {
          this._entityManager.unregister(this._purplePortal);
        }

        this._purplePortal = new PortalEntity(
          location.x,
          location.y,
          degrees,
          37.5,
          81.25,
          2.5,
          2.5,
          0,
          0,
          PortalType.Purple,
          null
        );

        if (this._greenPortal) {
          this._purplePortal.destination = this._greenPortal;
          this._greenPortal.destination = this._purplePortal;
        }

        this._entityManager.register(this._purplePortal);
      } else if (mouseClickEvent.eventData.mouseButton === MouseButton.Right) {
        if (this._greenPortal) {
          this._entityManager.unregister(this._greenPortal);
        }

        this._greenPortal = new PortalEntity(
          location.x,
          location.y,
          degrees,
          37.5,
          81.25,
          2.5,
          2.5,
          0,
          0,
          PortalType.Green,
          null
        );

        if (this._purplePortal) {
          this._greenPortal.destination = this._purplePortal;
          this._purplePortal.destination = this._greenPortal;
        }

        this._entityManager.register(this._greenPortal);
      }
    }
  }
}

export default PlayerEntity;
