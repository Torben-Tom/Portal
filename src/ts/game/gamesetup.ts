import AssetLoader from "../engine/assets/assetloader.js";
import AssetManager from "../engine/assets/assetmanager.js";
import SpriteSheet from "../engine/assets/texture/spritesheet.js";
import EngineSetup from "../engine/enginesetup.js";
import BackgroundTileEntity from "../engine/entitiy/backgroundtileentity.js";
import EntityManager from "../engine/entitiy/entitymanager.js";
import NetworkEntity from "./entities/networkentity.js";
import NetworkEntity2 from "./entities/networkentity2.js";

class GameSetup extends EngineSetup {
  public loadAssets(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager
  ): void {
    assetLoader.registerImages("image");
    assetLoader.registerAudios("audio");
  }

  public registerSpriteSheets(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager
  ): void {
    assetManager.registerSpriteSheet("icons", assetLoader.getImage("icons"));
    assetManager.registerSpriteSheet(
      "level1-background-window-sheet",
      assetLoader.getImage("level1-background-window")
    );
  }

  public registerTextures(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager
  ): void {
    this.registerSpriteSheets(assetLoader, assetManager, entityManager);
    this.registerNetworkTexture(assetLoader, assetManager);
    this.registerLevel1Textures(assetLoader, assetManager);
  }

  public registerEntities(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager
  ): void {
    entityManager.register(
      new BackgroundTileEntity(
        552,
        141,
        1,
        1,
        assetManager.getTexture("window")
      )
    );
    entityManager.register(
      new BackgroundTileEntity(
        0,
        0,
        1,
        1,
        assetManager.getTexture("level1-background")
      )
    );
    entityManager.register(new NetworkEntity());
    entityManager.register(new NetworkEntity2(0, 150, 50, 5, 0, 0));
    entityManager.register(new NetworkEntity2(500, 150, 5, 50, 0, 0));
  }

  private registerNetworkTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager
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
    assetManager: AssetManager
  ) {
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
}

export default GameSetup;
