import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";
import EntityManager from "../../engine/entitiy/entitymanager.js";
import InputHandler from "../../engine/input/inputhandler.js";

class NetworkEntity extends Entity {
  private _inputHandler: InputHandler;
  private _entityManager: EntityManager;

  private _yVelocity: number;

  constructor() {
    super(
      60,
      400,
      5,
      5,
      Services.resolve<AssetManager>("AssetManager").getTexture("network"),
      0,
      0
    );

    this._inputHandler = Services.resolve<InputHandler>("InputHandler");
    this._entityManager = Services.resolve<EntityManager>("EntityManager");
    this._yVelocity = 0;
  }

  update(delta: number): void {
    let isCollidingLeft = false;
    let isCollidingRight = false;
    let isCollidingTop = false;
    let isCollidingBottom = false;
    for (let collision of this._entityManager.getCollisions(this)) {
      if (!collision.entity1.boundingBox || !collision.entity2.boundingBox) {
        continue;
      }

      let intersection = collision.entity1.boundingBox.intersection(
        collision.entity2.boundingBox
      );
      let xDiff = this.boundingBox!.centerX - intersection.centerX;
      let yDiff = this.boundingBox!.centerY - intersection.centerY;
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          isCollidingLeft = true;
        } else {
          isCollidingRight = true;
        }
      } else {
        if (yDiff > 0) {
          isCollidingTop = true;
        } else {
          isCollidingBottom = true;
        }
      }
    }
    console.log(
      `Networkentity collisions:\nLeft: ${isCollidingLeft}\nRight: ${isCollidingRight}\nTop: ${isCollidingTop}\nBottom: ${isCollidingBottom}`
    );

    if (!isCollidingBottom) {
      this._yVelocity += 0.003 * delta;
      if (this._yVelocity > 2) {
        this._yVelocity = 2;
      }
    } else {
      if (this._yVelocity > 0) {
        this._yVelocity = 0;
      }

      if (this._inputHandler.isKeyDown(" ")) {
        this._yVelocity = -0.7;
      }
    }

    if (isCollidingTop && this._yVelocity < 0) {
      this._yVelocity = 0;
    }

    this._y += this._yVelocity * delta;

    if (this._y > 600) {
      this._y = 0;
    }

    if (this._x < 0) {
      this._x = 800;
    }

    if (this._x > 800) {
      this._x = 0;
    }

    if (
      (this._inputHandler.isKeyDown("ArrowLeft") ||
        this._inputHandler.isKeyDown("a")) &&
      !isCollidingLeft
    ) {
      this._x -= 1 * delta * 0.33;
    }
    if (
      (this._inputHandler.isKeyDown("ArrowRight") ||
        this._inputHandler.isKeyDown("d")) &&
      !isCollidingRight
    ) {
      this._x += 1 * delta * 0.33;
    }
  }
}

export default NetworkEntity;
