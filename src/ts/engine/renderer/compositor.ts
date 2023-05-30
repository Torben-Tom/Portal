import EntityManager from "../entitiy/entitymanager.js";
import DebugRenderer from "./renderers/debugrenderer.js";
import EntityRenderer from "./renderers/entityrenderer.js";
import RenderPipeline from "./renderpipeline.js";
import RenderPipelineBuilder from "./renderpipelinebuilder.js";

class Compositor {
  private _htmlCanvasElement: HTMLCanvasElement;
  private _canvasWidth!: number;
  private _canvasHeight!: number;
  private _glContext!: CanvasRenderingContext2D;
  private _renderPipeline!: RenderPipeline;
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
    entityManager: EntityManager
  ) {
    this._htmlCanvasElement = htmlCanvasElement;
    this.refreshSize();
    this.initializeGlContext();
    this.initializeRenderPipeline();
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
      .useRenderer(new EntityRenderer())
      .useRenderer(new DebugRenderer())
      .build();
  }

  private refreshSize(): void {
    this._canvasWidth = this._htmlCanvasElement.width;
    this._canvasHeight = this._htmlCanvasElement.height;
  }

  private clearCanvas(): void {
    this._glContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  render(delta: number): void {
    this.refreshSize();
    this.clearCanvas();

    this._entityManager.entities.forEach((entity) => {
      this._renderPipeline.render(entity, delta);
    });

    this._renderPipeline.render("debug", delta);
  }
}

export default Compositor;
