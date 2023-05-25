import Renderer from "./renderer.js";
import RenderPipelineBuilder from "./renderpipelinebuilder.js";

class RenderPipeline {
  private _glContext: CanvasRenderingContext2D;
  private _renderers: Renderer[];
  private _objectRenderCache: Map<any, Renderer>;

  constructor(renderPipelineBuilder: RenderPipelineBuilder) {
    this._glContext = renderPipelineBuilder.glContext;
    this._renderers = renderPipelineBuilder.renderers;
    this._objectRenderCache = new Map<any, Renderer>();
  }

  render(object: any, delta: number): void {
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
