import EntityManager from "../entitiy/entitymanager.js";
import LevelManager from "../level/levelmanager.js";
import SceneManager from "../scene/scenemanager.js";
import DebugRenderer from "./renderers/debugrenderer.js";
import ElementRenderer from "./renderers/elementrenderer.js";
import EntityRenderer from "./renderers/entityrenderer.js";
import SceneRenderer from "./renderers/scenerenderer.js";
import RenderPipeline from "./renderpipeline.js";
import RenderPipelineBuilder from "./renderpipelinebuilder.js";

class Compositor {
  private _htmlCanvasElement: HTMLCanvasElement;
  private _canvasWidth!: number;
  private _canvasHeight!: number;
  private _glContext!: CanvasRenderingContext2D;
  private _renderPipeline!: RenderPipeline;
  private _sceneManager: SceneManager;
  private _levelManager: LevelManager;
  private _entityManager: EntityManager;

  get canvasWidth(): number {
    return this._canvasWidth;
  }

  get canvasHeight(): number {
    return this._canvasHeight;
  }

  set canvasWidth(width: number) {
    this._htmlCanvasElement.width = width;
    this._canvasWidth = width;
  }

  set canvasHeight(height: number) {
    this._htmlCanvasElement.height = height;
    this._canvasHeight = height;
  }

  constructor(
    htmlCanvasElement: HTMLCanvasElement,
    sceneManager: SceneManager,
    levelManager: LevelManager,
    entityManager: EntityManager
  ) {
    this._htmlCanvasElement = htmlCanvasElement;
    this.refreshSize();
    this.initializeGlContext();
    this.initializeRenderPipeline();

    this._sceneManager = sceneManager;
    this._levelManager = levelManager;
    this._entityManager = entityManager;
  }

  private initializeGlContext(): void {
    let glContext = this._htmlCanvasElement.getContext("2d");
    if (!glContext) {
      throw new Error("Could not get 2D context");
    }
    this._glContext = glContext;
    this._glContext.imageSmoothingEnabled = false;
  }

  private initializeRenderPipeline(): void {
    this._renderPipeline = new RenderPipelineBuilder(this._glContext)
      .useRenderer(new SceneRenderer())
      .useRenderer(new EntityRenderer())
      .useRenderer(new ElementRenderer())
      .useRenderer(new DebugRenderer())
      .build();
  }

  private refreshSize(): void {
    this._canvasWidth = this._htmlCanvasElement.width;
    this._canvasHeight = this._htmlCanvasElement.height;
  }

  render(delta: number): void {
    this.refreshSize();

    this._glContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    let currentScene = this._sceneManager.currentScene;
    let currentLevel = this._levelManager.currentLevel;

    if (currentScene) {
      this._renderPipeline.render(currentScene, delta);
    }

    if (currentLevel) {
      for (let entity of this._entityManager.entities) {
        this._renderPipeline.render(entity, delta);
      }
    }

    if (currentScene) {
      for (let element of currentScene.elements) {
        this._renderPipeline.render(element, delta);
      }
    }

    this._renderPipeline.render("debug", delta);
  }
}

export default Compositor;
