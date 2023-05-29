import Services from "../../dependencyinjection/services.js";
import EntityManager from "../../entitiy/entitymanager.js";
import Game from "../../game.js";
import InputHandler from "../../input/inputhandler.js";
import Compositor from "../compositor.js";
import Renderer from "../renderer.js";

//TODO: Fix this mess of a class.

//This is a trash implementation, as it uses the Services class,
//and does a hacky setTimeout to get the instances of Game and InputHandler.

//Services class is only meant for users of the engine,
//not for the engine itself.

//However, it would be too much work for now to pass down
//the instances of Game and InputHandler.

//setTimeout is needed because the instances are not available
//at the time of construction of the DebugRenderer.

class DebugRenderer extends Renderer {
  private _game: Game | undefined;
  private _inputHandler: InputHandler | undefined;
  private _entityManager: EntityManager | undefined;
  private _compositor: Compositor | undefined;

  isApplicable(object: any): boolean {
    return object === "debug";
  }

  constructor() {
    super();
    setTimeout(() => {
      this._game = Services.resolve<Game>("Game");
      this._inputHandler = Services.resolve<InputHandler>("InputHandler");
      this._entityManager = Services.resolve<EntityManager>("EntityManager");
      this._compositor = Services.resolve<Compositor>("Compositor");
    });
  }

  render(
    glContext: CanvasRenderingContext2D,
    object: any,
    delta: number
  ): void {
    if (
      this._game &&
      this._inputHandler &&
      this._entityManager &&
      this._compositor
    ) {
      glContext.fillStyle = "rgba(0, 0, 0, 0.5)";
      glContext.fillRect(600, 500, 200, 100);

      glContext.fillStyle = "white";
      glContext.font = "15px Arial";
      glContext.fillText(`FPS: ${this._game.fps}`, 600, 512);
      glContext.fillText(`TPS: ${this._game.tps}`, 600, 525);
      glContext.fillText(
        `Mouse relative: ${this._inputHandler.mouseRelativeX}, ${this._inputHandler.mouseRelativeY}`,
        600,
        538
      );
      glContext.fillText(
        `Mouse absolute: ${this._inputHandler.mouseAbsoluteX}, ${this._inputHandler.mouseAbsoluteY}`,
        600,
        551
      );
      glContext.fillText(
        `Keys pressed: ${Array.from(this._inputHandler.keystates)
          .filter((keystate) => keystate[1])
          .map((keystate) => keystate[0])
          .join(", ")}`,
        600,
        564
      );

      if (this._inputHandler.isKeyDown("b")) {
        this._entityManager.entities.forEach((entity) => {
          if (!entity.boundingBox) {
            return;
          }

          let boundingBox = entity.boundingBox;
          if (
            boundingBox.isInside(
              this._inputHandler!.mouseRelativeX,
              this._inputHandler!.mouseRelativeY
            )
          ) {
            glContext.strokeStyle = "green";
          } else {
            glContext.strokeStyle = "black";
          }
          glContext.strokeRect(
            boundingBox.x,
            boundingBox.y,
            boundingBox.width,
            boundingBox.height
          );
        });

        for (let collision of this._entityManager.collisions) {
          if (
            !collision.entity1.boundingBox ||
            !collision.entity2.boundingBox
          ) {
            continue;
          }

          let collisionArea = collision.entity1.boundingBox.intersect(
            collision.entity2.boundingBox
          );
          glContext.strokeStyle = "red";
          glContext.strokeRect(
            collisionArea.x,
            collisionArea.y,
            collisionArea.width,
            collisionArea.height
          );
        }
      }

      if (this._inputHandler.isKeyDown("o")) {
        glContext.strokeRect(
          0,
          0,
          this._compositor.canvasWidth,
          this._compositor.canvasHeight
        );
      }
    }
  }
}

export default DebugRenderer;
