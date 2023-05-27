import Texture from "../assets/texture/texture.js";
import TileEntity from "./tileentity.js";

class BackgroundTileEntity extends TileEntity {
  constructor(
    x: number,
    y: number,
    scalingX: number,
    scalingY: number,
    width: number,
    height: number,
    texture: Texture
  ) {
    super(x, y, scalingX, scalingY, width, height, texture);
  }
}

export default BackgroundTileEntity;
