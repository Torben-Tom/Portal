import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";

class PlayerJump extends Entity {
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
      false,
      widthExpansion,
      heightExpansion,
      false,
      Services.resolve<AssetManager>("AssetManager").getTexture("playerJump")
    );
  }
}

export default PlayerJump;