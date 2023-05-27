import Texture from "../assets/texture/texture.js";
import TileEntity from "./tileentity.js";

class BackgroundTileEntity extends TileEntity {
  constructor(
    x: number,
    y: number,
    scalingX: number,
    scalingY: number,
    texture: Texture
  ) {
    super(x, y, scalingX, scalingY, texture, NaN, NaN);
  }
}

export default BackgroundTileEntity;
