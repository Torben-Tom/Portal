import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";

class LeftCornerBrickEntity extends Entity {
  constructor(
    x: number,
    y: number,
    scalingX: number,
    scalingY: number,
    widthExpansion: number,
    heightExpansion: number
  ) {
    super(
      x,
      y,
      scalingX,
      scalingY,
      Services.resolve<AssetManager>("AssetManager").getTexture(
        "leftCornerBrick"
      ),
      widthExpansion,
      heightExpansion
    );
  }
}

export default LeftCornerBrickEntity;
