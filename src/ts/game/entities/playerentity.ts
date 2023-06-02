import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import ComplexEntity from "../../engine/entitiy/complexentity.js";
import ComplexEntityBuilder from "../../engine/entitiy/complexentitybuilder.js";
import InputHandler from "../../engine/input/inputhandler.js";
import Point from "../../engine/math/point.js";
import Vector2D from "../../engine/math/vector2d.js";

class PlayerEntity extends ComplexEntity {
  private _inputHandler: InputHandler;

  constructor(
    x: number,
    y: number,
    _static: boolean,
    expansionX: number,
    expansionY: number,
    passThrough: boolean
  ) {
    super(
      new ComplexEntityBuilder(
        400,
        300,
        _static,
        expansionX,
        expansionY,
        passThrough,
        Services.resolve<AssetManager>("AssetManager").getTexture(
          "playerRunRight"
        )
      ).createPart(
        new Vector2D(0, 0),
        1,
        1,
        Services.resolve<AssetManager>("AssetManager").getTexture(
          "playerArmRight"
        )
      )
    );

    this._inputHandler = Services.resolve<InputHandler>("InputHandler");
  }

  public update(tickDelta: number): void {
    super.update(tickDelta);
    if (this._inputHandler.isKeyDown("w")) {
      this._location = new Point(this._location.x, this._location.y - 3);
    } else {
      this._location = new Point(this._location.x, this._location.y + 3);
    }

    if (this._inputHandler.isKeyDown("a")) {
      this._location = new Point(this._location.x - 3, this._location.y);
    }

    if (this._inputHandler.isKeyDown("s")) {
      this._location = new Point(this._location.x, this._location.y + 3);
    }

    if (this._inputHandler.isKeyDown("d")) {
      this._location = new Point(this._location.x + 3, this._location.y);
    }
  }
}

export default PlayerEntity;
