import AssetManager from "../../engine/assets/assetmanager.js";
import ConditionalTexture from "../../engine/assets/texture/conditionaltexture.js";
import Texture from "../../engine/assets/texture/texture.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";
import Vector2D from "../../engine/math/vector2d.js";

class PlayerArm extends Entity {
  constructor(
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
            () => this.rotation < -140,
            Services.resolve<AssetManager>("AssetManager").getTexture(
              "playerArmLeft"
            ),
          ],
        ]),
        100
      )
    );
  }

  public update(delta: number): void {}
}

export default PlayerArm;
