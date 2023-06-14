import Services from "../../dependencyinjection/services.js";
import ComplexEntity from "../../entitiy/complexentity.js";
import ComplexMovingEntity from "../../entitiy/complexmovingentity.js";
import Entity from "../../entitiy/entity.js";
import EntityManager from "../../entitiy/entitymanager.js";
import { isIComplexEntity } from "../../entitiy/icomplexentity.js";
import Game from "../../game.js";
import InputHandler from "../../input/inputhandler.js";
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

  public isApplicable(object: any): boolean {
    return object === "debug";
  }

  constructor() {
    super();
    setTimeout(() => {
      this._game = Services.resolve<Game>("Game");
      this._inputHandler = Services.resolve<InputHandler>("InputHandler");
      this._entityManager = Services.resolve<EntityManager>("EntityManager");
    });
  }

  private drawInfoBox(glContext: CanvasRenderingContext2D) {
    glContext.fillStyle = "rgba(0, 0, 0, 0.5)";
    glContext.fillRect(600, 500, 200, 100);

    glContext.textAlign = "left";
    glContext.textBaseline = "alphabetic";
    glContext.font = "15px Arial";
    glContext.fillStyle = "white";
    glContext.fillText(`FPS: ${this._game!.fps}`, 600, 512);
    glContext.fillText(`TPS: ${this._game!.tps}`, 600, 525);
    glContext.fillText(
      `Mouse relative: ${this._inputHandler!.mouseRelative.x}, ${
        this._inputHandler!.mouseRelative.y
      }`,
      600,
      538
    );
    glContext.fillText(
      `Mouse absolute: ${this._inputHandler!.mouseAbsolute.x}, ${
        this._inputHandler!.mouseAbsolute.y
      }`,
      600,
      551
    );
    glContext.fillText(
      `Keys pressed: ${Array.from(this._inputHandler!.keystates)
        .filter((keystate) => keystate[1])
        .map((keystate) => keystate[0])
        .join(", ")}`,
      600,
      564
    );
  }

  private drawBoundingBoxes(
    glContext: CanvasRenderingContext2D,
    entity: Entity
  ) {
    let centerOfMass = entity.location.add(entity.centerOfMass);
    glContext.translate(centerOfMass.x, centerOfMass.y);
    glContext.rotate((entity.rotation * Math.PI) / 180);
    glContext.translate(-centerOfMass.x, -centerOfMass.y);

    glContext.lineWidth = 1;

    let center = entity.boundingBox.centerAbsolute;
    glContext.fillStyle = "yellow";
    glContext.beginPath();
    glContext.arc(center.x, center.y, 5, 0, 2 * Math.PI, false);
    glContext.closePath();
    glContext.fill();

    glContext.fillStyle = "blue";
    glContext.beginPath();
    glContext.arc(centerOfMass.x, centerOfMass.y, 5, 0, 2 * Math.PI, false);
    glContext.closePath();
    glContext.fill();

    glContext.strokeStyle = "red";
    glContext.beginPath();
    glContext.moveTo(entity.location.x, entity.location.y);
    glContext.lineTo(centerOfMass.x, centerOfMass.y);
    glContext.closePath();
    glContext.stroke();

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
    glContext.setTransform(1, 0, 0, 1, 0, 0);

    if (isIComplexEntity(entity)) {
      for (let part of entity.parts) this.drawBoundingBoxes(glContext, part[1]);
    }
  }

  private drawCollisionBoxes(glContext: CanvasRenderingContext2D) {
    for (let collision of this._entityManager!.collisions) {
      if (!collision.entity1.boundingBox || !collision.entity2.boundingBox) {
        continue;
      }

      let collisionArea = collision.entity1.boundingBox.intersect(
        collision.entity2.boundingBox
      );

      let loopGoal = collisionArea.points.length;
      if (loopGoal === 0) {
        continue;
      }
      if (loopGoal >= 2) {
        loopGoal = loopGoal / 2 + 1;
      }

      glContext.strokeStyle = "red";
      for (let index = 0; index < loopGoal; index++) {
        let point = collisionArea.points[index];
        for (let otherPoint of collisionArea.points) {
          if (point === otherPoint) {
            continue;
          }

          glContext.beginPath();
          glContext.moveTo(point.x, point.y);
          glContext.lineTo(otherPoint.x, otherPoint.y);
          glContext.closePath();
          glContext.stroke();
        }
      }

      let center = collisionArea.center;
      glContext.fillStyle = "yellow";
      glContext.beginPath();
      glContext.arc(center.x, center.y, 5, 0, 2 * Math.PI, false);
      glContext.closePath();
      glContext.fill();
    }
  }

  public render(
    glContext: CanvasRenderingContext2D,
    object: any,
    delta: number
  ): void {
    if (this._game && this._entityManager && this._inputHandler) {
      this.drawInfoBox(glContext);
      if (this._inputHandler.isKeyDown("b")) {
        for (let entity of this._entityManager.entities) {
          this.drawBoundingBoxes(glContext, entity);
        }
        this.drawCollisionBoxes(glContext);
      }
    }
  }
}

export default DebugRenderer;
