import MouseClickEvent from "../event/events/mouseclickevent/mouseclickevent.js";
import InputHandler from "../input/inputhandler.js";
import Scene from "./scene.js";

class SceneManager {
  private _inputHandler: InputHandler;

  private _scenes: Map<string, Scene>;
  private _currentScene: Scene | null;

  get currentScene(): Scene | null {
    return this._currentScene;
  }

  constructor(inputHandler: InputHandler) {
    this._inputHandler = inputHandler;
    this._scenes = new Map<string, Scene>();
    this._currentScene = null;

    this._inputHandler.mouseClickEvent.subscribe(this.onMouseClick.bind(this));
  }

  public hasScene(name: string): boolean {
    return this._scenes.has(name);
  }

  public register(name: string, scene: Scene): void {
    if (this._scenes.has(name)) {
      console.warn(
        `Scene with name ${name} already exists! Overwriting with new value.`
      );
    }
    this._scenes.set(name, scene);
  }

  public switchScene(name: string): void {
    let scene: Scene | undefined = this._scenes.get(name);
    if (!scene) {
      throw new Error(`Scene with name ${name} does not exist!`);
    }

    if (this._currentScene !== null) {
      this._currentScene.close();
    }

    this._currentScene = scene;
    scene.open();
  }

  public update(tickDelta: number): void {
    if (this._currentScene) {
      for (let element of this._currentScene.elements) {
        element.hovered = element.isInside(this._inputHandler.mouseRelative);
      }

      this._currentScene.update(tickDelta);
    }
  }

  private onMouseClick(mouseClickEvent: MouseClickEvent): void {
    if (this._currentScene) {
      for (let element of this._currentScene.elements) {
        if (element.isInside(mouseClickEvent.eventData.locationRelative)) {
          element.click(mouseClickEvent);
          mouseClickEvent.cancel();
        }
      }
    }
  }
}

export default SceneManager;
