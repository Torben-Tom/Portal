import EntityManager from "./engine/entitiy/entitymanager.js";
import Renderer from "./engine/renderer/renderer.js";

class Game {
  #entityManager: EntityManager;
  #renderer: Renderer;

  #running: boolean;
  #lastTick: number;
  #lastRender: number;

  #tpsGoal: number;

  #currentTps: number;
  #currentFps: number;

  constructor(entityManager: EntityManager, renderer: Renderer) {
    this.#entityManager = entityManager;
    this.#renderer = renderer;

    this.#running = false;
    this.#lastTick = Date.now();
    this.#lastRender = Date.now();

    this.#tpsGoal = 100;

    this.#currentTps = 0;
    this.#currentFps = 0;
  }

  startUpdateLoop() {
    let updateLoopId: number = setInterval(() => {
      let now = Date.now();
      let tickDelta = now - this.#lastTick;
      this.#lastTick = now;
      this.#currentTps = Math.round(1 / (tickDelta / 1000));
      this.#entityManager.update(tickDelta);

      if (!this.#running) {
        clearInterval(updateLoopId);
        console.log("Update loop stopped");
      }
    }, 1000 / this.#tpsGoal);
  }

  renderLoop() {
    if (!document.hidden) {
      let now = Date.now();
      let renderDelta = now - this.#lastRender;
      this.#lastRender = now;
      this.#currentFps = Math.round(1 / (renderDelta / 1000));
      this.#renderer.render(renderDelta);
    }

    if (this.#running) {
      window.requestAnimationFrame(this.renderLoop.bind(this));
    } else {
      console.log("Render loop stopped");
      return;
    }
  }

  startGame() {
    this.#running = true;
    this.startUpdateLoop();
    this.renderLoop();
  }

  stopGame() {
    this.#running = false;
  }

  isRunning() {
    return this.#running;
  }

  getTps(): number {
    return this.#currentTps;
  }

  getFps(): number {
    return this.#currentFps;
  }

  getEntityManager(): EntityManager {
    return this.#entityManager;
  }

  getRenderer(): Renderer {
    return this.#renderer;
  }
}

export default Game;
