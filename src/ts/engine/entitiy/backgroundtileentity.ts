import Texture from "../assets/texture/texture.js";
import TileEntity from "./tileentity.js";

class BackgroundTileEntity extends TileEntity {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    texture: Texture
  ) {
    super(x, y, width, height, texture);
  }
}

export default BackgroundTileEntity;
