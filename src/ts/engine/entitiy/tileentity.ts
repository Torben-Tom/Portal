import Texture from "../assets/texture/texture.js";
import BoundingBox from "./boundingbox.js";
import Entity from "./entity.js";

class TileEntity extends Entity {
  constructor(
    x: number,
    y: number,
    scalingX: number,
    scalingY: number,
    expansionX: number,
    expansionY: number,
    passThrough: boolean,
    texture: Texture
  ) {
    super(
      x,
      y,
      scalingX,
      scalingY,
      expansionX,
      expansionY,
      passThrough,
      texture
    );
  }
}

export default TileEntity;
