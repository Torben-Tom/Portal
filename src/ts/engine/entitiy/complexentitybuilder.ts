import Texture from "../assets/texture/texture.js";
import ComplexEntity from "./complexentity.js";
import ComplexEntityBuilderBase from "./complexentitybuilderbase.js";

class ComplexEntityBuilder extends ComplexEntityBuilderBase<ComplexEntity> {
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

  public build(): ComplexEntity {
    return new ComplexEntity(this);
  }
}

export default ComplexEntityBuilder;
