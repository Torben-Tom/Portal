import AssetLoader from "../engine/assets/assetloader.js";
import AssetManager from "../engine/assets/assetmanager.js";
import SpriteSheet from "../engine/assets/texture/spritesheet.js";
import EngineSetup from "../engine/enginesetup.js";
import EntityManager from "../engine/entitiy/entitymanager.js";
import LevelManager from "../engine/level/levelmanager.js";
import Level1 from "./levels/level1.js";

class GameSetup extends EngineSetup {
  public loadAssets(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager,
    levelManager: LevelManager
  ): void {
    assetLoader.registerImages("image");
    assetLoader.registerAudios("audio");
  }

  public registerTextures(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager,
    levelManager: LevelManager
  ): void {
    this.registerSpriteSheets(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerNetworkTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerBottomBrickTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerRightBrickTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerLeftBrickTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerMiddleBrickTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerLeftCornerBrickTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerRightCornerBrickTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerBridgeTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerLevel1Textures(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
  }

  public registerSpriteSheets(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager,
    levelManager: LevelManager
  ): void {
    assetManager.registerSpriteSheet("icons", assetLoader.getImage("icons"));
    assetManager.registerSpriteSheet(
      "level1-background-window-sheet",
      assetLoader.getImage("level1-background-window")
    );
  }

  private registerBottomBrickTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    assetManager.registerStaticTexture(
      "bottomBrick",
      assetLoader.getImage("bottomBrick")
    );
  }
  private registerBridgeTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    assetManager.registerStaticTexture(
      "bridge",
      assetLoader.getImage("bridge")
    );
  }

  private registerLeftCornerBrickTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    assetManager.registerStaticTexture(
      "leftCornerBrick",
      assetLoader.getImage("leftCornerBrick")
    );
  }

  private registerRightCornerBrickTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    assetManager.registerStaticTexture(
      "rightCornerBrick",
      assetLoader.getImage("rightCornerBrick")
    );
  }

  private registerRightBrickTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    assetManager.registerStaticTexture(
      "rightBrick",
      assetLoader.getImage("rightBrick")
    );
  }

  private registerLeftBrickTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    assetManager.registerStaticTexture(
      "leftBrick",
      assetLoader.getImage("leftBrick")
    );
  }

  private registerMiddleBrickTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    assetManager.registerStaticTexture(
      "middleBrick",
      assetLoader.getImage("middleBrick")
    );
  }

  private registerNetworkTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    let iconsSpriteSheet: SpriteSheet = assetManager.getSpriteSheet("icons");

    assetManager.registerAnimatedTexture(
      "network",
      [
        assetManager.registerSliceTexture(
          "network1",
          iconsSpriteSheet.createSlice("network1", 0, 209, 10, 7)
        ),
        assetManager.registerSliceTexture(
          "network2",
          iconsSpriteSheet.createSlice("network2", 0, 201, 10, 7)
        ),
        assetManager.registerSliceTexture(
          "network3",
          iconsSpriteSheet.createSlice("network3", 0, 193, 10, 7)
        ),
        assetManager.registerSliceTexture(
          "network4",
          iconsSpriteSheet.createSlice("network4", 0, 185, 10, 7)
        ),
        assetManager.registerSliceTexture(
          "network5",
          iconsSpriteSheet.createSlice("network5", 0, 177, 10, 7)
        ),
      ],
      1000
    );
  }

  private registerLevel1Textures(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager,
    levelManager: LevelManager
  ): void {
    assetManager.registerStaticTexture(
      "level1-background",
      assetLoader.getImage("level1-background")
    );

    let level1BackgroundWindowSpriteSheet: SpriteSheet =
      assetManager.getSpriteSheet("level1-background-window-sheet");

    assetManager.registerAnimatedTexture(
      "window",
      [
        assetManager.registerSliceTexture(
          "window1",
          level1BackgroundWindowSpriteSheet.createSlice(
            "window1",
            16,
            129,
            180,
            180
          )
        ),
        assetManager.registerSliceTexture(
          "window2",
          level1BackgroundWindowSpriteSheet.createSlice(
            "window2",
            213,
            129,
            180,
            180
          )
        ),
        assetManager.registerSliceTexture(
          "window3",
          level1BackgroundWindowSpriteSheet.createSlice(
            "window3",
            410,
            129,
            180,
            180
          )
        ),
        assetManager.registerSliceTexture(
          "window4",
          level1BackgroundWindowSpriteSheet.createSlice(
            "window4",
            602,
            129,
            180,
            180
          )
        ),
      ],
      200
    );
  }

  registerLevels(
    _assetLoader: AssetLoader,
    _assetManager: AssetManager,
    _entityManager: EntityManager,
    _levelManager: LevelManager
  ): void {
    _levelManager.registerLevel("level1", new Level1());
  }
}

export default GameSetup;
