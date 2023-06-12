import AssetManager from "../../engine/assets/assetmanager.js";
import ConditionalTexture from "../../engine/assets/texture/conditionaltexture.js";
import Texture from "../../engine/assets/texture/texture.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";
import Direction from "../../engine/math/direction.js";

class PlayerArm extends Entity {
  private _direction: Direction;

  public get direction(): Direction {
    return this._direction;
  }

  public set direction(value: Direction) {
    this._direction = value;
  }

  public constructor(
    x: number,
    y: number,
    rotation: number,
    centerOfMassX: number,
    centerOfMassY: number,
    scalingX: number,
    scalingY: number,
    widthExpansion: number,
    heightExpansion: number
  ) {
    super(
      x,
      y,
      rotation,
      centerOfMassX,
      centerOfMassY,
      scalingX,
      scalingY,
      widthExpansion,
      heightExpansion,
      true,
      new ConditionalTexture(
        Services.resolve<AssetManager>("AssetManager").getTexture(
          "playerArmRight"
        ),
        new Map<Function, Texture>([
          [
            () => this._direction === Direction.Left,
            Services.resolve<AssetManager>("AssetManager").getTexture(
              "playerArmLeft"
            ),
          ],
        ]),
        100
      )
    );

    this._direction =
      rotation > 70 || rotation < -110 ? Direction.Left : Direction.Right;
  }

  public update(delta: number): void {}
}

export default PlayerArm;
