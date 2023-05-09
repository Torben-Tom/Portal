import EntityManager from "../entitiy/entitymanager.js";
import EntityRenderer from "./renderers/entityrenderer.js";
import RenderPipeline from "./renderpipeline.js";
import RenderPipelineBuilder from "./renderpipelinebuilder.js";

class Compositor {
  private _renderPipeline: RenderPipeline;
  private _entityManager: EntityManager;

  constructor(
    htmlCanvasElement: HTMLCanvasElement,
    entityManager: EntityManager
  ) {
    this._renderPipeline = new RenderPipelineBuilder(htmlCanvasElement)
      .useRenderer(new EntityRenderer())
      .build();

    this._entityManager = entityManager;
  }

  render(delta: number) {
    this._entityManager.entities.forEach((entity) => {
      this._renderPipeline.render(entity, delta);
    });
  }
}

export default Compositor;
