import Renderer from "./renderer.js";
import RenderPipeline from "./renderpipeline.js";

class RenderPipelineBuilder {
  protected _glContext: CanvasRenderingContext2D;
  protected _renderers: Renderer[];

  get glContext(): CanvasRenderingContext2D {
    return this._glContext;
  }

  get renderers(): Renderer[] {
    return this._renderers;
  }

  constructor(glContext: CanvasRenderingContext2D) {
    this._glContext = glContext;
    this._renderers = [];
  }

  useRenderer(renderer: Renderer): RenderPipelineBuilder {
    this._renderers.push(renderer);
    return this;
  }

  build(): RenderPipeline {
    return new RenderPipeline(this);
  }
}

export default RenderPipelineBuilder;
