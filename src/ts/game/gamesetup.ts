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
    this.registerPortalGreenTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerPortalGreenCloseTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerPortalGreenCreateTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerPortalPurpleCreateTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerPortalPurpleTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerPortalPurpleCloseTexture(
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
      "greenPortal",
      assetLoader.getImage("greenPortal")
    );
    assetManager.registerSpriteSheet(
      "purplePortal",
      assetLoader.getImage("purplePortal")
    );
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

  private registerPortalGreenCloseTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    let portalGreenSpriteSheet: SpriteSheet =
      assetManager.getSpriteSheet("greenPortal");

    assetManager.registerAnimatedTexture(
      "portalGreenClose",
      [
        assetManager.registerSliceTexture(
          "portalGreen17",
          portalGreenSpriteSheet.createSlice("portalGreen17", 0, 128, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen18",
          portalGreenSpriteSheet.createSlice("portalGreen18", 64, 128, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen19",
          portalGreenSpriteSheet.createSlice("portalGreen19", 128, 128, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen20",
          portalGreenSpriteSheet.createSlice("portalGreen20", 192, 128, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen21",
          portalGreenSpriteSheet.createSlice("portalGreen21", 256, 128, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen22",
          portalGreenSpriteSheet.createSlice("portalGreen22", 320, 128, 65, 65)
        ),
      ],
      100
    );
  }
  private registerPortalGreenCreateTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    let portalGreenSpriteSheet: SpriteSheet =
      assetManager.getSpriteSheet("greenPortal");

    assetManager.registerAnimatedTexture(
      "portalGreenCreate",
      [
        assetManager.registerSliceTexture(
          "portalGreen9",
          portalGreenSpriteSheet.createSlice("portalGreen9", 0, 64, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen10",
          portalGreenSpriteSheet.createSlice("portalGreen10", 64, 64, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen11",
          portalGreenSpriteSheet.createSlice("portalGreen11", 128, 64, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen12",
          portalGreenSpriteSheet.createSlice("portalGreen12", 192, 64, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen13",
          portalGreenSpriteSheet.createSlice("portalGreen13", 256, 64, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen14",
          portalGreenSpriteSheet.createSlice("portalGreen14", 320, 64, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen15",
          portalGreenSpriteSheet.createSlice("portalGreen15", 384, 64, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen16",
          portalGreenSpriteSheet.createSlice("portalGreen16", 448, 64, 65, 65)
        ),
      ],
      100
    );
  }

  private registerPortalGreenTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    let portalGreenSpriteSheet: SpriteSheet =
      assetManager.getSpriteSheet("greenPortal");

    assetManager.registerAnimatedTexture(
      "portalGreen",
      [
        assetManager.registerSliceTexture(
          "portalGreen1",
          portalGreenSpriteSheet.createSlice("portalGreen1", 0, 0, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen2",
          portalGreenSpriteSheet.createSlice("portalGreen2", 64, 0, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen3",
          portalGreenSpriteSheet.createSlice("portalGreen3", 128, 0, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen4",
          portalGreenSpriteSheet.createSlice("portalGreen4", 192, 0, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen5",
          portalGreenSpriteSheet.createSlice("portalGreen5", 256, 0, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen6",
          portalGreenSpriteSheet.createSlice("portalGreen6", 320, 0, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen7",
          portalGreenSpriteSheet.createSlice("portalGreen7", 384, 0, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen8",
          portalGreenSpriteSheet.createSlice("portalGreen8", 448, 0, 65, 65)
        ),
      ],
      100
    );
  }

  private registerPortalPurpleCloseTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    let portalPurpleSpriteSheet: SpriteSheet =
      assetManager.getSpriteSheet("purplePortal");

    assetManager.registerAnimatedTexture(
      "portalPurpleClose",
      [
        assetManager.registerSliceTexture(
          "portalPurple17",
          portalPurpleSpriteSheet.createSlice("portalPurple17", 0, 128, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple18",
          portalPurpleSpriteSheet.createSlice("portalPurple18", 64, 128, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple19",
          portalPurpleSpriteSheet.createSlice(
            "portalPurple19",
            128,
            128,
            65,
            65
          )
        ),
        assetManager.registerSliceTexture(
          "portalPurple20",
          portalPurpleSpriteSheet.createSlice(
            "portalPurple20",
            192,
            128,
            65,
            65
          )
        ),
        assetManager.registerSliceTexture(
          "portalPurple21",
          portalPurpleSpriteSheet.createSlice(
            "portalPurple21",
            256,
            128,
            65,
            65
          )
        ),
        assetManager.registerSliceTexture(
          "portalPurple22",
          portalPurpleSpriteSheet.createSlice(
            "portalPurple22",
            320,
            128,
            65,
            65
          )
        ),
      ],
      100
    );
  }
  private registerPortalPurpleCreateTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    let portalPurpleSpriteSheet: SpriteSheet =
      assetManager.getSpriteSheet("purplePortal");

    assetManager.registerAnimatedTexture(
      "portalPurpleCreate",
      [
        assetManager.registerSliceTexture(
          "portalPurple9",
          portalPurpleSpriteSheet.createSlice("portalPurple9", 0, 64, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple10",
          portalPurpleSpriteSheet.createSlice("portalPurple10", 64, 64, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple11",
          portalPurpleSpriteSheet.createSlice("portalPurple11", 128, 64, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple12",
          portalPurpleSpriteSheet.createSlice("portalPurple12", 192, 64, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple13",
          portalPurpleSpriteSheet.createSlice("portalPurple13", 256, 64, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple14",
          portalPurpleSpriteSheet.createSlice("portalPurple14", 320, 64, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple15",
          portalPurpleSpriteSheet.createSlice("portalPurple15", 384, 64, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple16",
          portalPurpleSpriteSheet.createSlice("portalPurple16", 448, 64, 65, 65)
        ),
      ],
      100
    );
  }

  private registerPortalPurpleTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    let portalPurpleSpriteSheet: SpriteSheet =
      assetManager.getSpriteSheet("purplePortal");

    assetManager.registerAnimatedTexture(
      "portalPurple",
      [
        assetManager.registerSliceTexture(
          "portalPurple1",
          portalPurpleSpriteSheet.createSlice("portalPurple1", 0, 0, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple2",
          portalPurpleSpriteSheet.createSlice("portalPurple2", 64, 0, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple3",
          portalPurpleSpriteSheet.createSlice("portalPurple3", 128, 0, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple4",
          portalPurpleSpriteSheet.createSlice("portalPurple4", 192, 0, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple5",
          portalPurpleSpriteSheet.createSlice("portalPurple5", 256, 0, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple6",
          portalPurpleSpriteSheet.createSlice("portalPurple6", 320, 0, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple7",
          portalPurpleSpriteSheet.createSlice("portalPurple7", 384, 0, 65, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple8",
          portalPurpleSpriteSheet.createSlice("portalPurple8", 448, 0, 65, 65)
        ),
      ],
      100
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
