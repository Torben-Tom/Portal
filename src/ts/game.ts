import Container from "./engine/dependencyinjection/container.js";
import EntityManager from "./engine/entitiy/entitymanager.js";
import Compositor from "./engine/renderer/compositor.js";

class Game {
  private _entityManager: EntityManager;
  private _compositor: Compositor;

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

  constructor(htmlCanvasElement: HTMLCanvasElement) {
    this._entityManager = new EntityManager();
    this._compositor = new Compositor(htmlCanvasElement, this._entityManager);

    Container.register(this._entityManager);
    Container.register(this._compositor);

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
      this._compositor.render(renderDelta);
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
