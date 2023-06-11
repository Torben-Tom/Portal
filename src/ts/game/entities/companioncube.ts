import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import MovingEntity from "../../engine/entitiy/movingentity.js";

class CompanionCube extends MovingEntity {
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
      0,
      0,
      0,
      scalingX,
      scalingY,
      widthExpansion,
      heightExpansion,
      false,
      Services.resolve<AssetManager>("AssetManager").getTexture("companionCube")
    );
  }
}

export default CompanionCube;
