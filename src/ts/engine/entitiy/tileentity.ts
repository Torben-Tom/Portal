import Texture from "../assets/texture/texture.js";
import Entity from "./entity.js";

class TileEntity extends Entity {
  constructor(
    x: number,
    y: number,
    rotation: number,
    centerOfMassX: number,
    centerOfMassY: number,
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
      rotation,
      centerOfMassX,
      centerOfMassY,
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
