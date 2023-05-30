import Texture from "../../assets/texture/texture.js";
import Entity from "../../entitiy/entity.js";
import Renderer from "../renderer.js";

class EntityRenderer extends Renderer {
  isApplicable(object: any): boolean {
    return object instanceof Entity;
  }

  render(
    glContext: CanvasRenderingContext2D,
    object: any,
    delta: number
  ): void {
    if (!(object instanceof Entity)) {
      throw new Error("Object is not an Entity");
    }

    let entity: Entity = object as Entity;
    let texture: Texture = entity.texture;

    glContext.drawImage(
      texture.htmlImageElement,
      texture.x,
      texture.y,
      texture.width,
      texture.height,
      entity.location.x,
      entity.location.y,
      texture.width * entity.scalingX,
      texture.height * entity.scalingY
    );
  }
}

export default EntityRenderer;
