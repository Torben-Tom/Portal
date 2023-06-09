import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import ComplexMovingEntity from "../../engine/entitiy/complexmovingentity.js";
import ComplexMovingEntityBuilder from "../../engine/entitiy/complexmovingentitybuilder.js";
import EntityManager from "../../engine/entitiy/entitymanager.js";
import EntitiesCollideEvent from "../../engine/event/events/entitiescollideevent.js";
import EntitiesUncollideEvent from "../../engine/event/events/entitiesuncollideevent.js";
import InputHandler from "../../engine/input/inputhandler.js";
import Vector2D from "../../engine/math/vector2d.js";
import PlayerArmRight from "./playerarmright.js";

class PlayerEntity extends ComplexMovingEntity {
  private _inputHandler: InputHandler;

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
        Services.resolve<AssetManager>("AssetManager").getTexture(
          "playerRunRight"
        )
      ).addPart(
        new Vector2D(0, 0),
        new PlayerArmRight(0, 0, 0, 20, 40, 1, 1, 0, 0)
      )
    );

    this._inputHandler = Services.resolve<InputHandler>("InputHandler");

    Services.resolve<EntityManager>("EntityManager").collideEvent.subscribe(
      (engineEvent: EntitiesCollideEvent) => {
        if (engineEvent.eventData.belongsToEntity(this)) {
          console.log(Date.now() + " collide");
        }
      }
    );

    Services.resolve<EntityManager>("EntityManager").uncollideEvent.subscribe(
      (engineEvent: EntitiesUncollideEvent) => {
        if (engineEvent.eventData.belongsToEntity(this)) {
          console.log(Date.now() + " uncollide");
        }
      }
    );
  }

  public update(delta: number): void {
    console.log(
      this.onGround +
        "/" +
        Services.resolve<EntityManager>("EntityManager").isColliding(this)
    );

    if (this._inputHandler) {
      if (this.onGround) {
        if (
          this._inputHandler.isKeyDown("w") ||
          this._inputHandler.isKeyDown(" ")
        ) {
          this.addVelocity(new Vector2D(0, -50));
          this.onGround = false;
        }
        if (this._inputHandler.isKeyDown("a")) {
          this.addVelocity(new Vector2D(-0.25 * delta, 0));
        }
        if (this._inputHandler.isKeyDown("d")) {
          this.addVelocity(new Vector2D(0.25 * delta, 0));
        }
      }
    }

    let armPart = this.parts[0][1];
    let mouseLocation = this._inputHandler.mouseRelative;
    let angle = Math.atan2(
      mouseLocation.y - armPart.centerOfMassAbsolute.y,
      mouseLocation.x - armPart.centerOfMassAbsolute.x
    );
    angle = angle * (180 / Math.PI) - 30;
    armPart.rotate(angle);

    super.update(delta);
  }
}

export default PlayerEntity;
