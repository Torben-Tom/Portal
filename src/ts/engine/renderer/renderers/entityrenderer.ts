import Texture from "../../assets/texture/texture.js";
import ComplexEntity from "../../entitiy/complexentity.js";
import Entity from "../../entitiy/entity.js";
import Renderer from "../renderer.js";

class EntityRenderer extends Renderer {
  public isApplicable(object: any): boolean {
    return object instanceof Entity;
  }

  private renderEntity(entity: Entity, glContext: CanvasRenderingContext2D) {
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

    if (entity instanceof ComplexEntity) {
      for (let part of entity.parts) {
        this.renderEntity(part[1], glContext);
      }
    }
  }

  public render(
    glContext: CanvasRenderingContext2D,
    object: any,
    delta: number
  ): void {
    if (!(object instanceof Entity)) {
      throw new Error("Object is not an Entity");
    }

    let entity: Entity = object as Entity;
    this.renderEntity(entity, glContext);
  }
}

export default EntityRenderer;
