import AssetLoader from "./assets/assetloader.js";
import AssetManager from "./assets/assetmanager";
import EntityManager from "./entitiy/entitymanager";

class EngineSetup {
  public loadAssets(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager
  ): void {
    console.warn(
      "loadAssets was not defined in EngineSetup provided class. This is probably not what you want."
    );
  }

  public registerTextures(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager
  ): void {
    console.warn(
      "registerTextures was not defined in EngineSetup provided class. This is probably not what you want."
    );
  }

  public registerEntities(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager
  ): void {
    console.warn(
      "registerEntities was not defined in EngineSetup provided class. This is probably not what you want."
    );
  }
}

export default EngineSetup;
