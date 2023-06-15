import AssetLoader from "../engine/assets/assetloader.js";
import AssetManager from "../engine/assets/assetmanager.js";
import SpriteSheet from "../engine/assets/texture/spritesheet.js";
import EngineSetup from "../engine/enginesetup.js";
import EntityManager from "../engine/entitiy/entitymanager.js";
import LevelManager from "../engine/level/levelmanager.js";
import SceneManager from "../engine/scene/scenemanager.js";
import Level1 from "./levels/level1.js";
import Level2 from "./levels/level2.js";
import Level3 from "./levels/level3.js";
import Level4 from "./levels/level4.js";
import GameOver from "./scenes/gameover.js";
import InGame from "./scenes/ingame.js";
import Level1Scene from "./scenes/level1scene.js";
import Level2Scene from "./scenes/level2scene.js";
import LevelOverview from "./scenes/leveloverview.js";
import GameOver from "./scenes/gameover.js";

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
    this.registerButtonGroundTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerButtonStandingTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerCompanionCubeTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerGoalTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerPlayerRunLeftTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerPlayerRunRightTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerPlayerRunLeftBackwordsTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerPlayerRunRightBackwordsTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerPlayerArmRightTexture(
      assetLoader,
      assetManager,
      entityManager,
      levelManager
    );
    this.registerPlayerArmLeftTexture(
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
    assetManager.registerSpriteSheet(
      "greenPortal",
      assetLoader.getImage("greenPortal")
    );
    assetManager.registerSpriteSheet(
      "purplePortal",
      assetLoader.getImage("purplePortal")
    );
    assetManager.registerSpriteSheet(
      "buttonGround",
      assetLoader.getImage("buttonGround")
    );
    assetManager.registerSpriteSheet(
      "buttonStanding",
      assetLoader.getImage("buttonStanding")
    );
    assetManager.registerSpriteSheet("goal", assetLoader.getImage("goal"));
    assetManager.registerSpriteSheet(
      "playerRunLeft",
      assetLoader.getImage("characterLeft")
    );
    assetManager.registerSpriteSheet(
      "playerRunRight",
      assetLoader.getImage("characterRight")
    );
    assetManager.registerSpriteSheet(
      "playerArmRight",
      assetLoader.getImage("playerArmRight")
    );
    assetManager.registerSpriteSheet(
      "playerArmLeft",
      assetLoader.getImage("playerArmLeft")
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

  private registerCompanionCubeTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    assetManager.registerStaticTexture(
      "companionCube",
      assetLoader.getImage("companionCube")
    );
  }

  private registerButtonGroundTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    let buttonGroundSpriteSheet: SpriteSheet =
      assetManager.getSpriteSheet("buttonGround");

    assetManager.registerSliceTexture(
      "buttonGroundUnclicked",
      buttonGroundSpriteSheet.createSlice("buttonGroundUnclicked", 2, 0, 67, 77)
    );

    assetManager.registerSliceTexture(
      "buttonGroundClicked",
      buttonGroundSpriteSheet.createSlice("buttonGroundClicked", 69, 0, 67, 77)
    );
  }

  private registerPlayerRunRightTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    let playerRunRightSpriteSheet: SpriteSheet =
      assetManager.getSpriteSheet("playerRunRight");

    assetManager.registerAnimatedTexture(
      "playerRunRight",
      [
        assetManager.registerSliceTexture(
          "playerRunRight1",
          playerRunRightSpriteSheet.createSlice(
            "playerRunRight1",
            14,
            10,
            48,
            78
          )
        ),
        assetManager.registerSliceTexture(
          "playerRunRight2",
          playerRunRightSpriteSheet.createSlice(
            "playerRunRight2",
            64,
            10,
            48,
            78
          )
        ),
        assetManager.registerSliceTexture(
          "playerRunRight3",
          playerRunRightSpriteSheet.createSlice(
            "playerRunRight3",
            118,
            10,
            48,
            78
          )
        ),
        assetManager.registerSliceTexture(
          "playerRunRight4",
          playerRunRightSpriteSheet.createSlice(
            "playerRunRight4",
            167,
            10,
            48,
            78
          )
        ),
      ],
      100
    );
  }

  private registerPlayerRunRightBackwordsTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    let playerRunRightSpriteSheet: SpriteSheet =
      assetManager.getSpriteSheet("playerRunRight");

    assetManager.registerAnimatedTexture(
      "playerRunRightBackwords",
      [
        assetManager.getTexture("playerRunRight4"),
        assetManager.getTexture("playerRunRight3"),
        assetManager.getTexture("playerRunRight2"),
        assetManager.getTexture("playerRunRight1"),
      ],
      100
    );
  }

  private registerPlayerRunLeftTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    let playerRunLeftSpriteSheet: SpriteSheet =
      assetManager.getSpriteSheet("playerRunLeft");

    assetManager.registerAnimatedTexture(
      "playerRunLeft",
      [
        assetManager.registerSliceTexture(
          "playerRunLeft1",
          playerRunLeftSpriteSheet.createSlice(
            "playerRunLeft1",
            160,
            10,
            48,
            78
          )
        ),
        assetManager.registerSliceTexture(
          "playerRunLeft2",
          playerRunLeftSpriteSheet.createSlice(
            "playerRunLeft2",
            111,
            10,
            48,
            78
          )
        ),
        assetManager.registerSliceTexture(
          "playerRunLeft3",
          playerRunLeftSpriteSheet.createSlice("playerRunLeft3", 57, 10, 48, 78)
        ),
        assetManager.registerSliceTexture(
          "playerRunLeft4",
          playerRunLeftSpriteSheet.createSlice("playerRunLeft4", 7, 10, 48, 78)
        ),
      ],
      100
    );
  }

  private registerPlayerRunLeftBackwordsTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    let playerRunLeftSpriteSheet: SpriteSheet =
      assetManager.getSpriteSheet("playerRunLeft");

    assetManager.registerAnimatedTexture(
      "playerRunLeftBackwords",
      [
        assetManager.getTexture("playerRunLeft4"),
        assetManager.getTexture("playerRunLeft3"),
        assetManager.getTexture("playerRunLeft2"),
        assetManager.getTexture("playerRunLeft1"),
      ],
      100
    );
  }

  private registerPlayerArmLeftTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    let playerArmLeftSpriteSheet: SpriteSheet =
      assetManager.getSpriteSheet("playerArmLeft");

    assetManager.registerAnimatedTexture(
      "playerArmLeft",
      [
        assetManager.registerSliceTexture(
          "playerArmLeft1",
          playerArmLeftSpriteSheet.createSlice("playerArmLeft1", 34, 11, 51, 78)
        ),
        assetManager.registerSliceTexture(
          "playerArmLeft2",
          playerArmLeftSpriteSheet.createSlice("playerArmLeft2", 93, 10, 51, 78)
        ),
      ],
      250
    );
  }

  private registerPlayerArmRightTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    let registerPlayerArmRightTexture: SpriteSheet =
      assetManager.getSpriteSheet("playerArmRight");

    assetManager.registerAnimatedTexture(
      "playerArmRight",
      [
        assetManager.registerSliceTexture(
          "playerArmRight1",
          registerPlayerArmRightTexture.createSlice(
            "playerArmRight1",
            34,
            10,
            51,
            78
          )
        ),
        assetManager.registerSliceTexture(
          "playerArmRight2",
          registerPlayerArmRightTexture.createSlice(
            "playerArmRight2",
            93,
            11,
            51,
            78
          )
        ),
      ],
      250
    );
  }
  private registerGoalTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    let goalSpriteSheet: SpriteSheet = assetManager.getSpriteSheet("goal");

    assetManager.registerAnimatedTexture(
      "goal",
      [
        assetManager.registerSliceTexture(
          "goal1",
          goalSpriteSheet.createSlice("goal1", 0, 0, 32, 48)
        ),
        assetManager.registerSliceTexture(
          "goal2",
          goalSpriteSheet.createSlice("goal2", 32, 0, 32, 48)
        ),
        assetManager.registerSliceTexture(
          "goal3",
          goalSpriteSheet.createSlice("goal3", 64, 0, 32, 48)
        ),
        assetManager.registerSliceTexture(
          "goal4",
          goalSpriteSheet.createSlice("goal4", 96, 0, 32, 48)
        ),
      ],
      100
    );
  }

  private registerButtonStandingTexture(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entitymanager: EntityManager,
    levelManager: LevelManager
  ): void {
    let buttonStandingSpriteSheet: SpriteSheet =
      assetManager.getSpriteSheet("buttonStanding");

    assetManager.registerSliceTexture(
      "buttonStandingUnclicked",
      buttonStandingSpriteSheet.createSlice(
        "buttonStandingUnclicked",
        6,
        0,
        46,
        82
      )
    );
    assetManager.registerSliceTexture(
      "buttonStandingClicked",
      buttonStandingSpriteSheet.createSlice(
        "buttonStandingClicked",
        48,
        0,
        86,
        82
      )
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
          portalGreenSpriteSheet.createSlice("portalGreen1", 10, 0, 30, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen2",
          portalGreenSpriteSheet.createSlice("portalGreen2", 74, 0, 30, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen3",
          portalGreenSpriteSheet.createSlice("portalGreen3", 138, 0, 30, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen4",
          portalGreenSpriteSheet.createSlice("portalGreen4", 202, 0, 30, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen5",
          portalGreenSpriteSheet.createSlice("portalGreen5", 266, 0, 30, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen6",
          portalGreenSpriteSheet.createSlice("portalGreen6", 330, 0, 30, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen7",
          portalGreenSpriteSheet.createSlice("portalGreen7", 394, 0, 30, 65)
        ),
        assetManager.registerSliceTexture(
          "portalGreen8",
          portalGreenSpriteSheet.createSlice("portalGreen8", 458, 0, 30, 65)
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
          portalPurpleSpriteSheet.createSlice("portalPurple1", 10, 0, 30, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple2",
          portalPurpleSpriteSheet.createSlice("portalPurple2", 74, 0, 30, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple3",
          portalPurpleSpriteSheet.createSlice("portalPurple3", 138, 0, 30, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple4",
          portalPurpleSpriteSheet.createSlice("portalPurple4", 202, 0, 30, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple5",
          portalPurpleSpriteSheet.createSlice("portalPurple5", 266, 0, 30, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple6",
          portalPurpleSpriteSheet.createSlice("portalPurple6", 330, 0, 30, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple7",
          portalPurpleSpriteSheet.createSlice("portalPurple7", 394, 0, 30, 65)
        ),
        assetManager.registerSliceTexture(
          "portalPurple8",
          portalPurpleSpriteSheet.createSlice("portalPurple8", 458, 0, 30, 65)
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
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager,
    levelManager: LevelManager
  ): void {
    levelManager.register("level1", new Level1());
    levelManager.register("level2", new Level2());
    levelManager.register("level3", new Level3());
    levelManager.register("level4", new Level4());
  }

  registerScenes(sceneManager: SceneManager): void {
    sceneManager.register("mainmenu", new MainMenu());
    sceneManager.register("ingame", new InGame());
    sceneManager.register("leveloverview", new LevelOverview());
    sceneManager.register("gameover", new GameOver());
    sceneManager.register("level1Scene", new Level1Scene());
    sceneManager.register("level2Scene", new Level2Scene());
  }
}

export default GameSetup;
