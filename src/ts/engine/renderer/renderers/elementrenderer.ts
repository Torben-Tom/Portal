import Element from "../../scene/element.js";
import Button from "../../scene/elements/button.js";
import Label from "../../scene/elements/label.js";
import Text from "../../scene/elements/text.js";
import Renderer from "../renderer.js";

class ElementRenderer extends Renderer {
  isApplicable(object: any): boolean {
    return object instanceof Element;
  }

  private drawBase(glContext: CanvasRenderingContext2D, element: Element) {
    glContext.fillStyle = element.background;
    glContext.fillRect(
      element.location.x,
      element.location.y,
      element.width,
      element.height
    );

    let borderSize = element.borderSize;
    if (borderSize > 0) {
      glContext.strokeStyle = element.border;
      glContext.lineWidth = borderSize;
      glContext.strokeRect(
        element.location.x,
        element.location.y,
        element.width,
        element.height
      );
    }
  }

  private drawLabel(glContext: CanvasRenderingContext2D, label: Label) {
    glContext.fillStyle = label.foreground;
    glContext.textAlign = label.textAlign;
    glContext.textBaseline = label.textBaseline;
    glContext.font = label.font;
    glContext.fillText(
      label.text,
      label.location.x + label.width / 2,
      label.location.y + label.height / 2
    );
  }

  render(
    glContext: CanvasRenderingContext2D,
    object: any,
    delta: number
  ): void {
    if (!(object instanceof Element)) {
      throw new Error("Object is not an Element");
    }

    if (!object.visible) {
      return;
    }

    this.drawBase(glContext, object);

    if (object instanceof Label) {
      this.drawLabel(glContext, object);
    }
  }
}

export default ElementRenderer;
