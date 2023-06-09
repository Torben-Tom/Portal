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
    let radians = (entity.rotation / 180) * Math.PI;
    let centerOfMass = entity.location.add(entity.centerOfMass);

    glContext.translate(centerOfMass.x, centerOfMass.y);
    glContext.rotate(radians);
    glContext.translate(-centerOfMass.x, -centerOfMass.y);
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
    glContext.setTransform(1, 0, 0, 1, 0, 0);
  }
}

export default EntityRenderer;
