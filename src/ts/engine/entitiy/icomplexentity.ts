import Vector2D from "../math/vector2d.js";
import Entity from "./entity.js";

interface IComplexEntity extends Entity {
  get parts(): [Vector2D, Entity][];
  update(tickDelta: number): void;
}

function isIComplexEntity(object: any): object is IComplexEntity {
  return "parts" in object;
}

export default IComplexEntity;
export { isIComplexEntity };
