import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";

class MetalWallEntity2 extends Entity {
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
      Services.resolve<AssetManager>("AssetManager").getTexture("bridge")
    );
  }

  update(delta: number): void {
    // Do nothing
  }
}

export default MetalWallEntity2;
