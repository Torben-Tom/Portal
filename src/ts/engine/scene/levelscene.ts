import Services from "../dependencyinjection/services.js";
import LevelManager from "../level/levelmanager.js";
import Scene from "./scene.js";

class LevelScene extends Scene {
  private _levelManager: LevelManager;

  private _levelName: string;

  public constructor(levelName: string) {
    super("rgba(0, 0, 0, 0)");
    this._levelManager = Services.resolve<LevelManager>("LevelManager");
    this._levelName = levelName;
  }

  public open(): void {
    this._levelManager.start(this._levelName);
  }
}

export default LevelScene;
