import Texture from "../../assets/texture/texture.js";
import Scene from "../../scene/scene.js";
import Renderer from "../renderer.js";

class SceneRenderer extends Renderer {
  isApplicable(object: any): boolean {
    return object instanceof Scene;
  }

  render(
    glContext: CanvasRenderingContext2D,
    object: any,
    delta: number
  ): void {
    if (!(object instanceof Scene)) {
      throw new Error("Object is not a Scene");
    }

    if (object.background instanceof Texture) {
      glContext.drawImage(
        object.background.htmlImageElement,
        object.background.x,
        object.background.y,
        object.background.width,
        object.background.height,
        0,
        0,
        glContext.canvas.width,
        glContext.canvas.height
      );
    } else {
      glContext.fillStyle = object.background;
      glContext.fillRect(0, 0, glContext.canvas.width, glContext.canvas.height);
    }
  }
}

export default SceneRenderer;
