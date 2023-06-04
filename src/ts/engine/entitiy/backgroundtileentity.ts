import Texture from "../assets/texture/texture.js";
import TileEntity from "./tileentity.js";

class BackgroundTileEntity extends TileEntity {
  constructor(
    x: number,
    y: number,
    rotation: number,
    centerOfMassX: number,
    centerOfMassY: number,
    scalingX: number,
    scalingY: number,
    texture: Texture
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
      0,
      0,
      true,
      texture
    );
  }
}

export default BackgroundTileEntity;
