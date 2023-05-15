import Renderer from "./renderer.js";
import RenderPipelineBuilder from "./renderpipelinebuilder.js";

class RenderPipeline {
  private _htmlCanvasElement: HTMLCanvasElement;
  private _canvasWidth: number;
  private _canvasHeight: number;
  private _glContext: CanvasRenderingContext2D;
  private _renderers: Renderer[];
  private _objectRenderCache: Map<any, Renderer>;

  get canvasWidth(): number {
    return this._canvasWidth;
  }

  get canvasHeight(): number {
    return this._canvasHeight;
  }

  constructor(renderPipelineBuilder: RenderPipelineBuilder) {
    //Initialize canvasWidth and canvasHeight to 0 to suppress TypeScript compiler errors
    this._canvasWidth = 0;
    this._canvasHeight = 0;

    this._htmlCanvasElement = renderPipelineBuilder.htmlCanvasElement;
    let glContext = this._htmlCanvasElement.getContext("2d");
    if (!glContext) {
      throw new Error("Could not get 2D context");
    }
    this._glContext = glContext;
    this._renderers = renderPipelineBuilder.renderers;
    this._objectRenderCache = new Map<any, Renderer>();

    this.refreshSize();
  }

  private refreshSize() {
    this._canvasWidth = this._htmlCanvasElement.width;
    this._canvasHeight = this._htmlCanvasElement.height;
  }

  render(object: any, delta: number): void {
    this.refreshSize();
    this._glContext.clearRect(0, 0, this._canvasWidth, this._canvasHeight);

    if (this._objectRenderCache.has(object)) {
      this._objectRenderCache
        .get(object)
        ?.render(this._glContext, object, delta);
    } else {
      for (let renderer of this._renderers) {
        if (renderer.isApplicable(object)) {
          this._objectRenderCache.set(object, renderer);
          renderer.render(this._glContext, object, delta);
          break;
        }
        console.warn(
          `No renderer found for object of type ${object.constructor.name}`
        );
      }
    }
  }
}

export default RenderPipeline;
