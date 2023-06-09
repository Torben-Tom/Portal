import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import ComplexEntity from "../../engine/entitiy/complexentity.js";
import ComplexEntityBuilder from "../../engine/entitiy/complexentitybuilder.js";
import EntityManager from "../../engine/entitiy/entitymanager.js";
import InputHandler from "../../engine/input/inputhandler.js";
import Vector2D from "../../engine/math/vector2d.js";
import PlayerArmRight from "./playerarmright.js";

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
      ).addPart(
        new Vector2D(0, 0),
        new PlayerArmRight(0, 0, 0, 20, 40, 1, 1, 0, 0)
      )
    );

    this._inputHandler = Services.resolve<InputHandler>("InputHandler");
  }

  public update(delta: number): void {
    if (this._inputHandler) {
      if (this._inputHandler.isKeyDown("w")) {
        this._location = this._location.add(new Vector2D(0, -0.15 * delta));
      }
      if (this._inputHandler.isKeyDown("a")) {
        this._location = this._location.add(new Vector2D(-0.15 * delta, 0));
      }
      if (this._inputHandler.isKeyDown("s")) {
        this._location = this._location.add(new Vector2D(0, 0.15 * delta));
      }
      if (this._inputHandler.isKeyDown("d")) {
        this._location = this._location.add(new Vector2D(0.15 * delta, 0));
      }
    }

    let mouseLocation = this._inputHandler.mouseRelative;
    let angle = Math.atan2(
      mouseLocation.y - this._location.y,
      mouseLocation.x - this._location.x
    );
    angle = angle * (180 / Math.PI) - 30;

    if (this.parts)
      for (let part of this.parts) {
        part[1].rotate(angle);
      }
    super.update(delta);
  }
}

export default PlayerEntity;
