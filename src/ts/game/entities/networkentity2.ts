import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";
import EntityManager from "../../engine/entitiy/entitymanager.js";

class NetworkEntity2 extends Entity {
  constructor(
    x: number,
    y: number,
    scalingX: number,
    scalingY: number,
    expansionX: number,
    expansionY: number
  ) {
    super(
      x,
      y,
      scalingX,
      scalingY,
      true,
      expansionX,
      expansionY,
      false,
      Services.resolve<AssetManager>("AssetManager").getTexture("network")
    );

    let entityManager: EntityManager =
      Services.resolve<EntityManager>("EntityManager");

    entityManager.touchEvent.subscribe((event) => {
      if (event.eventData.belongsToEntity(this)) {
        console.log("NetworkEntity2 touched");
      }
    });
    entityManager.untouchEvent.subscribe((event) => {
      if (event.eventData.belongsToEntity(this)) {
        console.log("NetworkEntity2 untouched");
      }
    });
    entityManager.collideEvent.subscribe((event) => {
      if (event.eventData.belongsToEntity(this)) {
        console.log("NetworkEntity2 collided");
      }
    });
    entityManager.uncollideEvent.subscribe((event) => {
      if (event.eventData.belongsToEntity(this)) {
        console.log("NetworkEntity2 uncollided");
      }
    });
  }
}

export default NetworkEntity2;
