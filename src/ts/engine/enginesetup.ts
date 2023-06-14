import AssetLoader from "./assets/assetloader.js";
import AssetManager from "./assets/assetmanager";
import EntityManager from "./entitiy/entitymanager";
import LevelManager from "./level/levelmanager.js";
import SceneManager from "./scene/scenemanager.js";

class EngineSetup {
  public loadAssets(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager,
    levelManager: LevelManager
  ): void {
    console.warn(
      "loadAssets was not defined in EngineSetup provided class. This is probably not what you want."
    );
  }

  public registerSpriteSheets(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager,
    levelManager: LevelManager
  ): void {
    console.warn(
      "registerSpriteSheets was not defined in EngineSetup provided class. This is probably not what you want."
    );
  }

  public registerTextures(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager,
    levelManager: LevelManager
  ): void {
    console.warn(
      "registerTextures was not defined in EngineSetup provided class. This is probably not what you want."
    );
  }

  registerLevels(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager,
    levelManager: LevelManager
  ) {
    console.warn(
      "registerLevels was not defined in EngineSetup provided class. This is probably not what you want."
    );
  }

  registerScenes(sceneManager: SceneManager) {
    console.warn(
      "registerScenes was not defined in EngineSetup provided class. This is probably not what you want."
    );
  }
}

export default EngineSetup;
