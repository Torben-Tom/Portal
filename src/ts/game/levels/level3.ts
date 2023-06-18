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
import Services from "../../engine/dependencyinjection/services.js";
import EngineEvent from "../../engine/event/engineevent.js";
import EntityManager from "../../engine/entitiy/entitymanager.js";
import ButtonGround from "../entities/buttonground.js";
import Goal from "../entities/goal.js";
import CompanionCube from "../entities/companioncube.js";
import MetalWallEntity from "../entities/metalwallentity.js";
import PlayerEntity from "../entities/playerentity.js";
import Vector2D from "../../engine/math/vector2d.js";
import LevelManager from "../../engine/level/levelmanager.js";
import SceneManager from "../../engine/scene/scenemanager.js";
import BridgeEntity from "../entities/bridgeentity.js";
import CookieManager from "../../engine/cookies/cookiemanager.js";
import Cookie from "../../engine/cookies/cookie.js";
import { addYears } from "../../engine/time/dateutils.js";

class Level3 implements Level {
  private _entityManager: EntityManager;
  private _assetManager: AssetManager;
  private _cookieManager: CookieManager;

  private _buttonGround1!: ButtonGround;
  private _buttonGround2!: ButtonGround;
  private _companionCubes!: CompanionCube[];
  private _goal!: Goal;

  constructor() {
    this._entityManager = Services.resolve<EntityManager>("EntityManager");
    this._assetManager = Services.resolve<AssetManager>("AssetManager");
    this._cookieManager = Services.resolve<CookieManager>("CookieManager");
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

    let player = new PlayerEntity(70, 400);
    let cornerBrickLeft = new LeftCornerBrickEntity(0, 550, 1.5, 1.5, 0, 0);
    let cornerBrickRight = new RightCornerBrickEntity(750, 550, 1.5, 1.5, 0, 0);

    this._buttonGround1 = new ButtonGround(170, 490, 1.3, 1.3, 0, 0);
    this._buttonGround2 = new ButtonGround(320, 490, 1.3, 1.3, 0, 0);

    let companionCube1 = new CompanionCube(150, 0, 0.5, 0.5, 0, 0);
    let companionCube2 = new CompanionCube(600, 0, 0.5, 0.5, 0, 0);
    this._companionCubes = [companionCube1, companionCube2];

    this._goal = new Goal(670, 450, 1.6, 1.6, 0, 0);

    let entities: Entity[] = [
      window,
      background,
      cornerBrickLeft,
      cornerBrickRight,
      this._buttonGround1,
      this._buttonGround2,
      companionCube1,
      companionCube2,
      this._goal,
      player,
    ];

    for (let i = 0; i < 14; i++) {
      let bottomBrick = new BottomBrickEntity(50 + i * 50, 550, 1.5, 1.5, 0, 0);
      entities.push(bottomBrick);
    }
    for (let i = 0; i < 11; i++) {
      let leftWallBrick = new LeftBrickEntity(0, i * 50, 1.5, 1.5, 0, 0);
      entities.push(leftWallBrick);

      let rightWallBrick = new RightBrickEntity(750, i * 50, 1.5, 1.5, 0, 0);
      entities.push(rightWallBrick);
    }

    for (let i = 0; i < 4; i++) {
      let middleBrick = new MiddleBrickEntity(50 + i * 50, 200, 1.5, 1.5, 0, 0);
      entities.push(middleBrick);
    }

    for (let i = 0; i < 6; i++) {
      let middleBrick = new MiddleBrickEntity(
        450 + i * 50,
        350,
        1.5,
        1.5,
        0,
        0
      );
      entities.push(middleBrick);
    }

    for (let i = 0; i < 4; i++) {
      let middleBrick = new MiddleBrickEntity(
        550 + i * 50,
        400,
        1.5,
        1.5,
        0,
        0
      );
      entities.push(middleBrick);
    }

    for (let i = 0; i < 2; i++) {
      let bridgeEntity = new BridgeEntity(550, 450 + i * 50, 1.5, 1.5, 0, 0);
      entities.push(bridgeEntity);

      let metalWallEntity = new MetalWallEntity(
        600,
        450 + i * 50,
        1.5,
        1.5,
        0,
        0
      );
      entities.push(metalWallEntity);
    }

    return entities;
  }

  public load(): void {
    this._goal.onTouch.subscribe((engineEvent: EngineEvent<Goal>) => {
      this._cookieManager.set(
        "level3.solved",
        new Cookie("true", addYears(new Date(), 1), "Strict", false)
      );
      this._cookieManager.save();

      Services.resolve<SceneManager>("SceneManager").switch("ingame");
      let levelManager: LevelManager =
        Services.resolve<LevelManager>("LevelManager");
      levelManager.start("level4");
    });
    this._buttonGround1.onUnpress.subscribe(
      (engineEvent: EngineEvent<ButtonGround>) => {
        if (
          this._entityManager.entities.filter(
            (entity) => entity instanceof BridgeEntity
          ).length >= 5
        ) {
          return;
        }
        for (let i = 0; i < 2; i++) {
          this._entityManager.register(
            new BridgeEntity(550, 450 + i * 50, 1.5, 1.5, 0, 0)
          );
        }
      }
    );

    this._buttonGround2.onUnpress.subscribe(
      (engineEvent: EngineEvent<ButtonGround>) => {
        if (
          this._entityManager.entities.filter(
            (entity) => entity instanceof BridgeEntity
          ).length >= 5
        ) {
          return;
        }
        for (let i = 0; i < 2; i++) {
          this._entityManager.register(
            new MetalWallEntity(600, 450 + i * 50, 1.5, 1.5, 0, 0)
          );
        }
      }
    );

    this._buttonGround1.onPress.subscribe(
      (engineEvent: EngineEvent<ButtonGround>) => {
        this._entityManager.unregisterAll(
          this._entityManager.entities.filter(
            (entity) => entity instanceof BridgeEntity
          )
        );
      }
    );

    this._buttonGround2.onPress.subscribe(
      (engineEvent: EngineEvent<ButtonGround>) => {
        this._entityManager.unregisterAll(
          this._entityManager.entities.filter(
            (entity) => entity instanceof MetalWallEntity
          )
        );
      }
    );
  }

  unload(): void {}

  public update(tickDelta: number): void {
    for (let companionCube of this._companionCubes) {
      let location = companionCube.location;
      if (location.x <= 55) {
        companionCube.addVelocity(new Vector2D(25, 0));
      } else if (location.x >= 695) {
        companionCube.addVelocity(new Vector2D(-25, 0));
      }
    }
  }
}

export default Level3;
