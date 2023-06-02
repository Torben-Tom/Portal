import Services from "../../dependencyinjection/services.js";
import ComplexEntity from "../../entitiy/complexentity.js";
import Entity from "../../entitiy/entity.js";
import EntityManager from "../../entitiy/entitymanager.js";
import Touch from "../../entitiy/touch.js";
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

  private drawInfoBox(glContext: CanvasRenderingContext2D) {
    if (this._game && this._inputHandler) {
      glContext.fillStyle = "rgba(0, 0, 0, 0.5)";
      glContext.fillRect(600, 500, 200, 100);

      glContext.fillStyle = "white";
      glContext.font = "15px Arial";
      glContext.fillText(`FPS: ${this._game.fps}`, 600, 512);
      glContext.fillText(`TPS: ${this._game.tps}`, 600, 525);
      glContext.fillText(
        `Mouse relative: ${this._inputHandler.mouseRelative.x}, ${this._inputHandler.mouseRelative.y}`,
        600,
        538
      );
      glContext.fillText(
        `Mouse absolute: ${this._inputHandler.mouseAbsolute.x}, ${this._inputHandler.mouseAbsolute.y}`,
        600,
        551
      );

      glContext.fillText("Keys pressed:", 600, 564);
      let keystates = Array.from(this._inputHandler.keystates)
        .filter((keystate) => keystate[1])
        .map((keystate) => keystate[0]);
      for (let i = 0; i < keystates.length; i++) {
        let column = i % 4;
        let row = Math.floor(i / 4);
        glContext.fillText(keystates[i], 705 + column * 20, 564 + row * 15);
      }
    }
  }

  private drawBoundingBox(glContext: CanvasRenderingContext2D, entity: Entity) {
    let boundingBox = entity.boundingBox;
    if (boundingBox.isInside(this._inputHandler!.mouseRelative)) {
      glContext.strokeStyle = "green";
    } else {
      glContext.strokeStyle = "black";
    }

    glContext.strokeRect(
      boundingBox.location.x,
      boundingBox.location.y,
      boundingBox.width,
      boundingBox.height
    );

    if (entity instanceof ComplexEntity) {
      for (let part of entity.parts) {
        this.drawBoundingBox(glContext, part[1]);
      }
    }
  }

  private drawBoundingBoxes(glContext: CanvasRenderingContext2D) {
    if (this._entityManager) {
      for (let entity of this._entityManager.entities) {
        this.drawBoundingBox(glContext, entity);
      }
    }
  }

  private drawCollisionBox(
    glContext: CanvasRenderingContext2D,
    collision: Touch
  ) {
    let collisionArea = collision.entity1.boundingBox.intersect(
      collision.entity2.boundingBox
    );
    glContext.strokeStyle = "red";
    glContext.strokeRect(
      collisionArea.location.x,
      collisionArea.location.y,
      collisionArea.width,
      collisionArea.height
    );
  }

  private drawCollisionBoxes(glContext: CanvasRenderingContext2D) {
    if (this._entityManager) {
      for (let collision of this._entityManager.collisions) {
        this.drawCollisionBox(glContext, collision);
      }
    }
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
      this.drawInfoBox(glContext);

      if (this._inputHandler.isKeyDown("b")) {
        this.drawBoundingBoxes(glContext);
        this.drawCollisionBoxes(glContext);
      }
    }
  }
}

export default DebugRenderer;
