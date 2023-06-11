import AssetManager from "../../engine/assets/assetmanager.js";
import BackgroundTileEntity from "../../engine/entitiy/backgroundtileentity.js";
import Entity from "../../engine/entitiy/entity.js";
import Level from "../../engine/level/level.js";
import BottomBrickEntity from "../entities/bottombrickentity.js";
import LeftBrickEntity from "../entities/leftbrickentity.js";
import RightBrickEntity from "../entities/rightbrickentity.js";
import LeftCornerBrickEntity from "../entities/leftcornerbrickentity.js";
import RightCornerBrickEntity from "../entities/rightcornerbrickentity.js";
import MiddleBrickEntity from "../entities/middlebrickentity.js";
import BridgeEntity from "../entities/bridgeentity.js";
import Services from "../../engine/dependencyinjection/services.js";
import EngineEvent from "../../engine/event/engineevent.js";
import EntityManager from "../../engine/entitiy/entitymanager.js";
import PortalGreen from "../entities/portalgreen.js";
import PortalPurple from "../entities/portalpurple.js";
import ButtonGround from "../entities/buttonground.js";
import ButtonStanding from "../entities/buttonstanding.js";
import Goal from "../entities/goal.js";
import CompanionCube from "../entities/companioncube.js";
import PlayerArmRight from "../entities/playerarmright.js";
import PlayerEntity from "../entities/playerentity.js";
import PortalEntity from "../entities/portalentity.js";
import PortalType from "../entities/portaltype.js";
import LevelManager from "../../engine/level/levelmanager.js";

class Level1 implements Level {
  private _entityManager: EntityManager;
  private _assetManager: AssetManager;

  private _buttonGround!: ButtonGround;
  private _buttonStanding!: ButtonStanding;
  private _goal!: Goal;
  private _purplePortal!: PortalEntity;
  private _greenPortal!: PortalEntity;

  constructor() {
    this._entityManager = Services.resolve<EntityManager>("EntityManager");
    this._assetManager = Services.resolve<AssetManager>("AssetManager");
  }

  public getEntities(): Entity[] {
    let window = new BackgroundTileEntity(
      552,
      141,
      0,
      0,
      0,
      1,
      1,
      this._assetManager.getTexture("window")
    );

    let background = new BackgroundTileEntity(
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      this._assetManager.getTexture("level1-background")
    );

    let player = new PlayerEntity(100, 450);
    let cornerBrickLeft = new LeftCornerBrickEntity(0, 550, 1.5, 1.5, 0, 0);
    let cornerBrickRight = new RightCornerBrickEntity(750, 550, 1.5, 1.5, 0, 0);

    this._purplePortal = new PortalEntity(
      0,
      150,
      2.5,
      2.5,
      0,
      0,
      PortalType.PURPLE,
      null
    );

    this._greenPortal = new PortalEntity(
      650,
      400,
      2.5,
      2.5,
      0,
      0,
      PortalType.GREEN,
      null
    );

    this._purplePortal.destination = this._greenPortal;
    this._greenPortal.destination = this._purplePortal;

    this._buttonGround = new ButtonGround(175, 490, 1.3, 1.3, 0, 0);
    this._buttonStanding = new ButtonStanding(550, 470, 1.1, 1.1, 0, 0, 0);
    let companionCube = new CompanionCube(200, 250, 0.5, 0.5, 0, 0);
    this._goal = new Goal(685, 275, 1.6, 1.6, 0, 0);

    let returnArray: Entity[] = [
      background,
      window,
      cornerBrickLeft,
      cornerBrickRight,
      this._buttonGround,
      this._buttonStanding,
      companionCube,
      this._goal,
      player,
    ];

    for (let i = 0; i < 14; i++) {
      let bottomBrick = new BottomBrickEntity(50 + i * 50, 550, 1.5, 1.5, 0, 0);
      returnArray.push(bottomBrick);
    }
    for (let i = 0; i < 11; i++) {
      let leftWallBrick = new LeftBrickEntity(0, i * 50, 1.5, 1.5, 0, 0);
      let rightWallBrick = new RightBrickEntity(750, i * 50, 1.5, 1.5, 0, 0);
      returnArray.push(leftWallBrick);
      returnArray.push(rightWallBrick);
    }

    for (let i = 0; i < 5; i++) {
      let middleBrick = new MiddleBrickEntity(
        500 + i * 50,
        350,
        1.5,
        1.5,
        0,
        0
      );
      returnArray.push(middleBrick);
    }

    for (let i = 0; i < 5; i++) {
      let middleBrick = new MiddleBrickEntity(50 + i * 50, 300, 1.5, 1.5, 0, 0);
      returnArray.push(middleBrick);
    }

    return returnArray;
  }

  public load(): void {
    this._buttonGround.onPress.subscribe(
      (engineEvent: EngineEvent<ButtonGround>) => {
        if (
          this._entityManager.entities.filter(
            (entity) => entity instanceof BridgeEntity
          ).length >= 5
        ) {
          return;
        }
        for (let i = 0; i < 5; i++) {
          this._entityManager.register(
            new BridgeEntity(300 + i * 50, 300, 1.5, 1.5, 0, 0)
          );
        }
      }
    );

    this._buttonGround.onUnpress.subscribe(
      (engineEvent: EngineEvent<ButtonGround>) => {
        this._entityManager.unregisterAll(
          this._entityManager.entities.filter(
            (entity) => entity instanceof BridgeEntity
          )
        );
      }
    );

    this._buttonStanding.onPress.subscribe(
      (engineEvent: EngineEvent<ButtonStanding>) => {
        this._entityManager.register(this._purplePortal);
        this._entityManager.register(this._greenPortal);
      }
    );

    this._goal.onTouch.subscribe((engineEvent: EngineEvent<Goal>) => {
      let levelManager: LevelManager =
        Services.resolve<LevelManager>("LevelManager");
      levelManager.startLevel("level2");
    });
  }

  public unload(): void {
    console.log("Level1 unloaded");
  }

  public update(tickDelta: number): void {}
}

export default Level1;
