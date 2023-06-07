import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";

class NetworkEntity2 extends Entity {
  constructor(
    x: number,
    y: number,
    rotation: number,
    centerOfMassX: number,
    centerOfMassY: number,
    scalingX: number,
    scalingY: number,
    expansionX: number,
    expansionY: number
  ) {
    super(
      x,
      y,
      rotation,
      centerOfMassX,
      centerOfMassY,
      scalingX,
      scalingY,
      true,
      expansionX,
      expansionY,
      false,
      Services.resolve<AssetManager>("AssetManager").getTexture("network")
    );
  }

  update(tickDelta: number): void {
    this._rotation += 0.1;
  }
}

export default NetworkEntity2;
