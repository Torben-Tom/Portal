import Texture from "../assets/texture/texture.js";
import Entity from "./entity.js";

class TileEntity extends Entity {
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

export default TileEntity;
