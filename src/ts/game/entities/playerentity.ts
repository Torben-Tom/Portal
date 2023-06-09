import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import ComplexEntity from "../../engine/entitiy/complexentity.js";
import ComplexEntityBuilder from "../../engine/entitiy/complexentitybuilder.js";
import InputHandler from "../../engine/input/inputhandler.js";
import Vector2D from "../../engine/math/vector2d.js";

class PlayerEntity extends ComplexEntity {
  private _inputHandler: InputHandler;
  constructor(x: number, y: number) {
    super(
      new ComplexEntityBuilder(
        x,
        y,
        0,
        0,
        0,
        1,
        1,
        false,
        0,
        0,
        false,
        Services.resolve<AssetManager>("AssetManager").getTexture(
          "playerRunRight"
        )
      )
    );
    this._inputHandler = Services.resolve<InputHandler>("InputHandler");
  }

  public update(delta: number): void {
    super.update(delta);

    if (this._inputHandler) {
      if (this._inputHandler.isKeyDown("w")) {
        this._location = this._location.add(new Vector2D(0, -0.1 * delta));
      }
      if (this._inputHandler.isKeyDown("a")) {
        this._location = this._location.add(new Vector2D(-0.1 * delta, 0));
      }
      if (this._inputHandler.isKeyDown("s")) {
        this._location = this._location.add(new Vector2D(0, 0.1 * delta));
      }
      if (this._inputHandler.isKeyDown("d")) {
        this._location = this._location.add(new Vector2D(0.1 * delta, 0));
      }
    }
  }
}

export default PlayerEntity;
