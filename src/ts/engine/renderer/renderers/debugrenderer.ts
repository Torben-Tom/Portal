import Services from "../../dependencyinjection/services.js";
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

  isApplicable(object: any): boolean {
    return object === "debug";
  }

  constructor() {
    super();
    setTimeout(() => {
      this._game = Services.resolve<Game>("Game");
      this._inputHandler = Services.resolve<InputHandler>("InputHandler");
    });
  }

  render(
    glContext: CanvasRenderingContext2D,
    object: any,
    delta: number
  ): void {
    if (this._game && this._inputHandler) {
      glContext.fillText(`FPS: ${this._game.fps}`, 50, 10);
      glContext.fillText(`TPS: ${this._game.tps}`, 50, 20);
      glContext.fillText(
        `Mouse relative: ${this._inputHandler.mouseRelativeX}, ${this._inputHandler.mouseRelativeY}`,
        50,
        30
      );
      glContext.fillText(
        `Mouse absolute: ${this._inputHandler.mouseAbsoluteX}, ${this._inputHandler.mouseAbsoluteY}`,
        50,
        40
      );

      glContext.fillText(
        `space pressed: ${this._inputHandler.isKeyDown(" ")}`,
        50,
        50
      );
    }
  }
}

export default DebugRenderer;
