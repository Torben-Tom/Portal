import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";

class PortalPurple extends Entity {
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
      true,
      widthExpansion,
      heightExpansion,
      true,
      Services.resolve<AssetManager>("AssetManager").getTexture("portalPurple")
    );
  }
}

export default PortalPurple;
