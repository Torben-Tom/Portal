import Texture from "../assets/texture/texture.js";
import ComplexEntityBuilderBase from "./complexentitybuilderbase.js";
import ComplexMovingEntity from "./complexmovingentity.js";

class ComplexMovingEntityBuilder extends ComplexEntityBuilderBase<ComplexMovingEntity> {
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

  public build(): ComplexMovingEntity {
    return new ComplexMovingEntity(this);
  }
}

export default ComplexMovingEntityBuilder;
