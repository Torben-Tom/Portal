import Texture from "../assets/texture/texture.js";
import Entity from "./entity.js";

class TileEntity extends Entity {
  constructor(
    x: number,
    y: number,
    scalingX: number,
    scalingY: number,
    texture: Texture,
    widthExpansion?: number,
    heightExpansion?: number
  ) {
    super(x, y, scalingX, scalingY, texture, widthExpansion, heightExpansion);
  }
}

export default TileEntity;
