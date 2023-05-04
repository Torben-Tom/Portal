import Container from "./engine/dependencyinjection/container.js";
import EntityManager from "./engine/entitiy/entitymanager.js";
import Renderer from "./engine/renderer/renderer.js";

class Game {
  private _entityManager: EntityManager;
  private _renderer: Renderer;

  private _running: boolean;
  private _lastTick: number;
  private _lastRender: number;

  private _tpsGoal: number;

  private _currentTps: number;
  private _currentFps: number;

  get running() {
    return this._running;
  }

  get tps(): number {
    return this._currentTps;
  }

  get fps(): number {
    return this._currentFps;
  }

  get entityManager(): EntityManager {
    return this._entityManager;
  }

  get renderer(): Renderer {
    return this._renderer;
  }

  constructor() {
    let entityManager: EntityManager | undefined =
      Container.resolve("EntityManager");
    if (!entityManager) {
      throw new Error("No EntityManager registered in the container");
    }
    this._entityManager = entityManager;

    let renderer: Renderer | undefined = Container.resolve("Renderer");
    if (!renderer) {
      throw new Error("No Renderer registered in the container");
    }
    this._renderer = renderer;

    this._running = false;
    this._lastTick = Date.now();
    this._lastRender = Date.now();

    this._tpsGoal = 100;

    this._currentTps = 0;
    this._currentFps = 0;
  }

  startUpdateLoop() {
    let updateLoopId: number = setInterval(() => {
      let now = Date.now();
      let tickDelta = now - this._lastTick;
      this._lastTick = now;
      this._currentTps = Math.round(1 / (tickDelta / 1000));
      this._entityManager.update(tickDelta);

      if (!this._running) {
        clearInterval(updateLoopId);
        console.log("Update loop stopped");
      }
    }, 1000 / this._tpsGoal);
  }

  renderLoop() {
    if (!document.hidden) {
      let now = Date.now();
      let renderDelta = now - this._lastRender;
      this._lastRender = now;
      this._currentFps = Math.round(1 / (renderDelta / 1000));
      this._renderer.render(renderDelta);
    }

    if (this._running) {
      window.requestAnimationFrame(this.renderLoop.bind(this));
    } else {
      console.log("Render loop stopped");
      return;
    }
  }

  startGame() {
    this._running = true;
    this.startUpdateLoop();
    this.renderLoop();
  }

  stopGame() {
    this._running = false;
  }
}

export default Game;
