import Renderer from "./renderer.js";
import RenderPipeline from "./renderpipeline.js";

class RenderPipelineBuilder {
  protected _htmlCanvasElement: HTMLCanvasElement;
  protected _renderers: Renderer[];

  get htmlCanvasElement(): HTMLCanvasElement {
    return this._htmlCanvasElement;
  }

  get renderers(): Renderer[] {
    return this._renderers;
  }

  constructor(htmlCanvasElement: HTMLCanvasElement) {
    this._htmlCanvasElement = htmlCanvasElement;
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
