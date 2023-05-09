import Entity from "../../entitiy/entity.js";
import Renderer from "../renderer.js";

class EntityRenderer extends Renderer {
  isApplicable(object: any): boolean {
    return object instanceof Entity;
  }
  render(object: any, delta: number): void {
    throw new Error("Method not implemented.");
  }
}

export default EntityRenderer;
