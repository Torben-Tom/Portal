import AssetLoader from "./assets/assetloader.js";
import AssetManager from "./assets/assetmanager.js";
import CookieManager from "./cookies/cookiemanager.js";
import Services from "./dependencyinjection/services.js";
import EngineSetup from "./enginesetup.js";
import EntityManager from "./entitiy/entitymanager.js";
import InputHandler from "./input/inputhandler.js";
import LevelManager from "./level/levelmanager.js";
import Compositor from "./renderer/compositor.js";
import SceneManager from "./scene/scenemanager.js";
import SettingsManager from "./settings/settingsmanager.js";

class Game {
  private _assetLoader: AssetLoader;
  private _assetManager: AssetManager;
  private _cookieManager: CookieManager;
  private _settingsManager: SettingsManager;
  private _inputHandler: InputHandler;
  private _sceneManager: SceneManager;
  private _entityManager: EntityManager;
  private _levelManager: LevelManager;
  private _compositor: Compositor;

  private _running: boolean;
  private _lastTick: number;
  private _lastRender: number;

  private _tpsGoal: number;
  private _tickDeltaTolerance: number;

  private _currentTps: number;
  private _currentFps: number;

  get running(): boolean {
    return this._running;
  }

  get tps(): number {
    return this._currentTps;
  }

  get fps(): number {
    return this._currentFps;
  }

  constructor(htmlCanvasElement: HTMLCanvasElement, engineSetup: EngineSetup) {
    this._assetLoader = new AssetLoader();
    this._assetManager = new AssetManager();
    this._cookieManager = new CookieManager();
    this._settingsManager = new SettingsManager();
    this._inputHandler = new InputHandler(htmlCanvasElement);
    this._sceneManager = new SceneManager(this._inputHandler);
    this._entityManager = new EntityManager();
    this._levelManager = new LevelManager(this._entityManager);
    this._compositor = new Compositor(
      htmlCanvasElement,
      this._sceneManager,
      this._levelManager,
      this._entityManager
    );

    this._running = false;
    this._lastTick = Date.now();
    this._lastRender = Date.now();

    this._tpsGoal = 100;
    this._tickDeltaTolerance = 50;

    this._currentTps = 0;
    this._currentFps = 0;

    Services.register(this._assetLoader);
    Services.register(this._assetManager);
    Services.register(this._cookieManager);
    Services.register(this._settingsManager);
    Services.register(this._inputHandler);
    Services.register(this._sceneManager);
    Services.register(this._entityManager);
    Services.register(this._levelManager);
    Services.register(this._compositor);
    Services.register(this);

    this._cookieManager.load();

    engineSetup.loadAssets(
      this._assetLoader,
      this._assetManager,
      this._entityManager,
      this._levelManager
    );

    while (!this._assetLoader.areAssetsReady()) {
      console.log("Loading assets...");
    }

    engineSetup.registerTextures(
      this._assetLoader,
      this._assetManager,
      this._entityManager,
      this._levelManager
    );

    engineSetup.registerLevels(
      this._assetLoader,
      this._assetManager,
      this._entityManager,
      this._levelManager
    );

    engineSetup.registerScenes(this._sceneManager);
  }

  public startUpdateLoop(): void {
    let updateLoopId: number = setInterval(() => {
      let now = Date.now();
      let tickDelta = now - this._lastTick;
      this._lastTick = now;
      this._currentTps = Math.round(1 / (tickDelta / 1000));

      if (tickDelta > this._tickDeltaTolerance) {
        tickDelta = this._tickDeltaTolerance;
      }

      this._sceneManager.update(tickDelta);
      this._entityManager.update(tickDelta);
      this._levelManager.update(tickDelta);

      if (!this._running) {
        clearInterval(updateLoopId);
        console.log("Update loop stopped");
      }
    }, 1000 / this._tpsGoal);
  }

  public renderLoop(): void {
    let now = Date.now();
    let renderDelta = now - this._lastRender;

    //Sometimes, browser will call requestAnimationFrame multiple times in a row, causing a renderDelta of 1. This is a workaround.
    if (renderDelta > 1) {
      this._lastRender = now;
      this._currentFps = Math.round(1 / (renderDelta / 1000));

      if (!document.hidden) {
        this._compositor.render(renderDelta);
      }
    }

    if (this._running) {
      window.requestAnimationFrame(this.renderLoop.bind(this));
    } else {
      console.log("Render loop stopped");
      return;
    }
  }

  public startGame(): void {
    this._running = true;
    this.startUpdateLoop();
    this.renderLoop();
  }

  public stopGame(): void {
    this._running = false;
  }
}

export default Game;
