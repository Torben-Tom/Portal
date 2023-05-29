import Texture from "../assets/texture/texture.js";
import BoundingBox from "./boundingbox.js";
import Entity from "./entity.js";

class TileEntity extends Entity {
  constructor(
    x: number,
    y: number,
    scalingX: number,
    scalingY: number,
    _static: boolean,
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
      _static,
      expansionX,
      expansionY,
      passThrough,
      texture
    );
  }
}

export default TileEntity;
