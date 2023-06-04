import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";
import InputHandler from "../../engine/input/inputhandler.js";
import Vector2D from "../../engine/math/vector2d.js";

class NetworkEntity extends Entity {
  private _inputHandler: InputHandler;

  constructor() {
    super(
      10,
      10,
      0,
      0,
      0,
      5,
      5,
      false,
      0,
      0,
      false,
      Services.resolve<AssetManager>("AssetManager").getTexture("network")
    );

    this._inputHandler = Services.resolve<InputHandler>("InputHandler");
  }

  update(delta: number): void {
    let newX = this.location.x;
    let newY = this.location.y;
    if (
      this._inputHandler.isKeyDown("ArrowUp") ||
      this._inputHandler.isKeyDown("w")
    ) {
      newY -= 1 * delta * 0.33;
    }

    if (
      this._inputHandler.isKeyDown("ArrowLeft") ||
      this._inputHandler.isKeyDown("a")
    ) {
      newX -= 1 * delta * 0.33;
    }

    if (
      this._inputHandler.isKeyDown("ArrowDown") ||
      this._inputHandler.isKeyDown("s")
    ) {
      newY += 1 * delta * 0.33;
    }

    if (
      this._inputHandler.isKeyDown("ArrowRight") ||
      this._inputHandler.isKeyDown("d")
    ) {
      newX += 1 * delta * 0.33;
    }

    this._location = new Vector2D(newX, newY);
  }
}

export default NetworkEntity;
