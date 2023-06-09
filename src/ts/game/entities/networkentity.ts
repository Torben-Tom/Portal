import AssetManager from "../../engine/assets/assetmanager.js";
import ConditionalTexture from "../../engine/assets/texture/conditionaltexture.js";
import Texture from "../../engine/assets/texture/texture.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";
import EntityManager from "../../engine/entitiy/entitymanager.js";
import InputHandler from "../../engine/input/inputhandler.js";
import Vector2D from "../../engine/math/vector2d.js";

class NetworkEntity extends Entity {
  private _inputHandler: InputHandler;

  private _speed: number = 1;

  constructor() {
    super(
      10,
      10,
      0,
      0,
      0,
      5,
      5,
      0,
      0,
      false,
      Services.resolve<AssetManager>("AssetManager").getTexture("network")
    );

    this._inputHandler = Services.resolve<InputHandler>("InputHandler");

    let entityManager: EntityManager =
      Services.resolve<EntityManager>("EntityManager");

    entityManager.touchEvent.subscribe((event) => {
      if (event.eventData.belongsToEntity(this)) {
        console.log("NetworkEntity2 touched");
      }
    });
    entityManager.untouchEvent.subscribe((event) => {
      if (event.eventData.belongsToEntity(this)) {
        console.log("NetworkEntity2 untouched");
      }
    });
    entityManager.collideEvent.subscribe((event) => {
      if (event.eventData.belongsToEntity(this)) {
        console.log("NetworkEntity2 collided");
      }
    });
    entityManager.uncollideEvent.subscribe((event) => {
      if (event.eventData.belongsToEntity(this)) {
        console.log("NetworkEntity2 uncollided");
      }
    });
  }

  update(delta: number): void {
    let newX = this.location.x;
    let newY = this.location.y;

    if (this._inputHandler.isKeyDown(" ")) {
      this._speed = 0.5;
    } else {
      this._speed = 0.1;
    }

    if (
      this._inputHandler.isKeyDown("ArrowUp") ||
      this._inputHandler.isKeyDown("w")
    ) {
      newY -= delta * this._speed;
    }

    if (
      this._inputHandler.isKeyDown("ArrowLeft") ||
      this._inputHandler.isKeyDown("a")
    ) {
      newX -= delta * this._speed;
    }

    if (
      this._inputHandler.isKeyDown("ArrowDown") ||
      this._inputHandler.isKeyDown("s")
    ) {
      newY += delta * this._speed;
    }

    if (
      this._inputHandler.isKeyDown("ArrowRight") ||
      this._inputHandler.isKeyDown("d")
    ) {
      newX += delta * this._speed;
    }

    this._location = new Vector2D(newX, newY);
  }
}

export default NetworkEntity;
