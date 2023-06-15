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
import InputHandler from "../../engine/input/inputhandler.js";
import Services from "../../engine/dependencyinjection/services.js";
import EngineEvent from "../../engine/event/engineevent.js";
import EntityManager from "../../engine/entitiy/entitymanager.js";
import ButtonGround from "../entities/buttonground.js";
import ButtonStanding from "../entities/buttonstanding.js";
import Goal from "../entities/goal.js";
import CompanionCube from "../entities/companioncube.js";
import PlayerArmRight from "../entities/playerarm.js";
import MetalWallEntity from "../entities/metalwallentity.js";
import PlayerEntity from "../entities/playerentity.js";
import Vector2D from "../../engine/math/vector2d.js";
import LevelManager from "../../engine/level/levelmanager.js";
import SceneManager from "../../engine/scene/scenemanager.js";
import MetalWallEntity2 from "../entities/metalwallentity2.js";

class Level4 implements Level {
  private _inputHandler: InputHandler;
  private _entityManager: EntityManager;
  private _assetManager: AssetManager;
  private _buttonGround1!: ButtonGround;
  private _buttonGround2!: ButtonGround;
  private _companionCubes!: CompanionCube[];
  private _goal!: Goal;
  private _buttonGround3!: ButtonGround;

  constructor() {
    this._inputHandler = Services.resolve<InputHandler>("InputHandler");
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

    let player = new PlayerEntity(270, 400);
    let cornerBrickLeft = new LeftCornerBrickEntity(0, 550, 1.5, 1.5, 0, 0);
    let cornerBrickRight = new RightCornerBrickEntity(750, 550, 1.5, 1.5, 0, 0);
    let stopBrick = new MiddleBrickEntity(450, 300, 1.5, 1.5, 0, 0);
    this._buttonGround1 = new ButtonGround(50, 490, 1.3, 1.3, 0, 0);
    this._buttonGround2 = new ButtonGround(500, 290, 1.3, 1.3, 0, 0);
    this._buttonGround3 = new ButtonGround(50, 340, 1.3, 1.3, 0, 0);

    let companionCube1 = new CompanionCube(400, 400, 0.5, 0.5, 0, 0);
    let companionCube2 = new CompanionCube(600, 400, 0.5, 0.5, 0, 0);
    this._companionCubes = [companionCube1, companionCube2];

    this._goal = new Goal(370, 20, 1.6, 1.6, 0, 0);

    let entities: Entity[] = [
      window,
      background,
      cornerBrickLeft,
      cornerBrickRight,
      this._buttonGround1,
      this._buttonGround2,
      this._buttonGround3,
      companionCube1,
      companionCube2,
      this._goal,
      player,
      stopBrick,
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

    for (let i = 0; i < 3; i++) {
      let leftWallBrick = new LeftBrickEntity(300, i * 50, 1.5, 1.5, 0, 0);
      entities.push(leftWallBrick);

      let rightWallBrick = new RightBrickEntity(450, i * 50, 1.5, 1.5, 0, 0);
      entities.push(rightWallBrick);
    }

    for (let i = 0; i < 2; i++) {
      let bridgeEntity = new BridgeEntity(350 + i * 50, 100, 1.5, 1.5, 0, 0);
      entities.push(bridgeEntity);

      let metalWallEntity = new MetalWallEntity(
        150,
        450 + i * 50,
        1.5,
        1.5,
        0,
        0
      );
      entities.push(metalWallEntity);
    }

    for (let i = 0; i < 2; i++) {
      let bridgeEntity = new BridgeEntity(350 + i * 50, 100, 1.5, 1.5, 0, 0);
      entities.push(bridgeEntity);

      let metalWallEntity = new MetalWallEntity2(
        200,
        450 + i * 50,
        1.5,
        1.5,
        0,
        0
      );
      entities.push(metalWallEntity);
    }

    for (let i = 0; i < 4; i++) {
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
      let middleBrick = new MiddleBrickEntity(50 + i * 50, 400, 1.5, 1.5, 0, 0);
      entities.push(middleBrick);
    }

    return entities;
  }

  public load(): void {
    this._goal.onTouch.subscribe((engineEvent: EngineEvent<Goal>) => {
      Services.resolve<LevelManager>("LevelManager").unload();
      Services.resolve<SceneManager>("SceneManager").switch("gameover");
    });
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
            new MetalWallEntity(150, 450 + i * 50, 1.5, 1.5, 0, 0)
          );
        }
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

    this._buttonGround3.onUnpress.subscribe(
      (engineEvent: EngineEvent<ButtonGround>) => {
        if (
          this._entityManager.entities.filter(
            (entity) => entity instanceof MetalWallEntity2
          ).length >= 5
        ) {
          return;
        }
        for (let i = 0; i < 2; i++) {
          this._entityManager.register(
            new MetalWallEntity2(200, 450 + i * 50, 1.5, 1.5, 0, 0)
          );
        }
      }
    );

    this._buttonGround3.onPress.subscribe(
      (engineEvent: EngineEvent<ButtonGround>) => {
        this._entityManager.unregisterAll(
          this._entityManager.entities.filter(
            (entity) => entity instanceof MetalWallEntity2
          )
        );
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
  }

  public unload(): void {
    console.log("Level4 unloaded");
  }

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

export default Level4;
