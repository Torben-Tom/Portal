import Texture from "../../assets/texture/texture.js";
import ComplexEntity from "../../entitiy/complexentity.js";
import ComplexMovingEntity from "../../entitiy/complexmovingentity.js";
import Entity from "../../entitiy/entity.js";
import IComplexEntity, {
  isIComplexEntity,
} from "../../entitiy/icomplexentity.js";
import Renderer from "../renderer.js";

class EntityRenderer extends Renderer {
  isApplicable(object: any): boolean {
    return object instanceof Entity;
  }

  private renderEntity(glContext: CanvasRenderingContext2D, entity: Entity) {
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

    if (isIComplexEntity(entity)) {
      let complexEntity = entity as IComplexEntity;
      for (let part of complexEntity.parts) {
        this.renderEntity(glContext, part[1]);
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

    this.renderEntity(glContext, object);
  }
}

export default EntityRenderer;
