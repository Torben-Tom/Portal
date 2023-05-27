import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";
import InputHandler from "../../engine/input/inputhandler.js";

class NetworkEntity extends Entity {
  private _inputHandler: InputHandler;
  constructor() {
    super(
      10,
      10,
      2,
      2,
      0,
      0,
      Services.resolve<AssetManager>("AssetManager").getTexture("network")
    );

    this._inputHandler = Services.resolve<InputHandler>("InputHandler");
  }

  update(delta: number): void {
    if (
      this._inputHandler.isKeyDown("ArrowUp") ||
      this._inputHandler.isKeyDown("w")
    ) {
      this._y -= 1 * delta;
    }
    if (
      this._inputHandler.isKeyDown("ArrowDown") ||
      this._inputHandler.isKeyDown("s")
    ) {
      this._y += 1 * delta;
    }
    if (
      this._inputHandler.isKeyDown("ArrowLeft") ||
      this._inputHandler.isKeyDown("a")
    ) {
      this._x -= 1 * delta;
    }
    if (
      this._inputHandler.isKeyDown("ArrowRight") ||
      this._inputHandler.isKeyDown("d")
    ) {
      this._x += 1 * delta;
    }
  }
}

export default NetworkEntity;
