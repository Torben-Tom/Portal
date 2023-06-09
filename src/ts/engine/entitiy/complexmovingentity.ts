import Vector2D from "../math/vector2d.js";
import ComplexMovingEntityBuilder from "./complexmovingentitybuilder.js";
import Entity from "./entity.js";
import IComplexEntity from "./icomplexentity.js";
import MovingEntity from "./movingentity.js";

class ComplexMovingEntity extends MovingEntity implements IComplexEntity {
  private _parts: [Vector2D, Entity][];

  public get parts(): [Vector2D, Entity][] {
    return this._parts;
  }

  constructor(complexEntityBuilder: ComplexMovingEntityBuilder) {
    super(
      complexEntityBuilder.x,
      complexEntityBuilder.y,
      complexEntityBuilder.rotation,
      complexEntityBuilder.centerOfMassX,
      complexEntityBuilder.centerOfMassY,
      complexEntityBuilder.scalingX,
      complexEntityBuilder.scalingY,
      complexEntityBuilder.expansionX,
      complexEntityBuilder.expansionY,
      complexEntityBuilder.passThrough,
      complexEntityBuilder.texture
    );
    this._parts = complexEntityBuilder.parts;
  }

  public update(tickDelta: number) {
    super.update(tickDelta);
    for (let part of this._parts) {
      part[1].update(tickDelta);
      part[1].teleport(this._location.add(part[0]));
    }
  }
}

export default ComplexMovingEntity;
