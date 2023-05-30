import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";

class CompanionCube extends Entity {
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
        "companionCube"
      ),
      widthExpansion,
      heightExpansion
    );
  }
}

export default CompanionCube;
