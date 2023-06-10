import AssetManager from "../../engine/assets/assetmanager.js";
import BackgroundTileEntity from "../../engine/entitiy/backgroundtileentity.js";
import Entity from "../../engine/entitiy/entity.js";
import Level from "../../engine/level/level.js";
import BottomBrickEntity from "../entities/bottombrickentity.js";
import LeftBrickEntity from "../entities/leftbrickentity.js";
import NetworkEntity from "../entities/networkentity.js";
import RightBrickEntity from "../entities/rightbrickentity.js";
import LeftCornerBrickEntity from "../entities/leftcornerbrickentity.js";
import RightCornerBrickEntity from "../entities/rightcornerbrickentity.js";
import MiddleBrickEntity from "../entities/middlebrickentity.js";
import BridgeEntity from "../entities/bridgeentity.js";
import InputHandler from "../../engine/input/inputhandler.js";
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
import MetalWallEntity from "../entities/metalwallentity.js";
import PlayerEntity from "../entities/playerentity.js";

class Level3 implements Level {
  private _inputHandler: InputHandler;
  private _entityManager: EntityManager;
  private _assetManager: AssetManager;
  private _buttonGround1!: ButtonGround;
  private _buttonGround2!: ButtonGround;

  constructor() {
    this._inputHandler = Services.resolve<InputHandler>("InputHandler");
    this._entityManager = Services.resolve<EntityManager>("EntityManager");
    this._assetManager = Services.resolve<AssetManager>("AssetManager");
  }

  public load(): void {
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
            new BridgeEntity(200, 450 + i * 50, 1.5, 1.5, 0, 0)
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
            new MetalWallEntity(150, 450 + i * 50, 1.5, 1.5, 0, 0)
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

  public unload(): void {
    console.log("Level3 unloaded");
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

    let player = new PlayerEntity(270, 450);
    let cornerBrickLeft = new LeftCornerBrickEntity(0, 550, 1.5, 1.5, 0, 0);
    let cornerBrickRight = new RightCornerBrickEntity(750, 550, 1.5, 1.5, 0, 0);

    let greenPortal1 = new PortalGreen(0, 50, 2.5, 2.5, -110, 0);
    let greenPortal2 = new PortalGreen(640, 400, 2.5, 2.5, -110, 0);
    let purplePortal = new PortalPurple(640, -25, 2.5, 2.5, -110, 0);
    this._buttonGround1 = new ButtonGround(520, 490, 1.3, 1.3, 0, 0);
    this._buttonGround2 = new ButtonGround(370, 490, 1.3, 1.3, 0, 0);
    let companionCube1 = new CompanionCube(200, 150, 0.5, 0.5, 0, 0);
    let companionCube2 = new CompanionCube(600, 100, 0.5, 0.5, 0, 0);
    let goal = new Goal(70, 470, 1.6, 1.6, 0, 0);

    let returnArray: Entity[] = [];
    returnArray.push(window);
    returnArray.push(background);
    returnArray.push(cornerBrickLeft);
    returnArray.push(cornerBrickRight);
    returnArray.push(greenPortal1);
    returnArray.push(greenPortal2);
    returnArray.push(purplePortal);
    returnArray.push(player);
    returnArray.push(this._buttonGround1);
    returnArray.push(this._buttonGround2);
    returnArray.push(companionCube1);
    returnArray.push(companionCube2);
    returnArray.push(goal);

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

    for (let i = 0; i < 4; i++) {
      let middleBrick = new MiddleBrickEntity(
        550 + i * 50,
        130,
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

    for (let i = 0; i < 4; i++) {
      let middleBrick = new MiddleBrickEntity(50 + i * 50, 400, 1.5, 1.5, 0, 0);
      returnArray.push(middleBrick);
    }

    for (let i = 0; i < 2; i++) {
      let bridgeEntity = new BridgeEntity(200, 450 + i * 50, 1.5, 1.5, 0, 0);
      returnArray.push(bridgeEntity);

      let metalWallEntity = new MetalWallEntity(
        150,
        450 + i * 50,
        1.5,
        1.5,
        0,
        0
      );
      returnArray.push(metalWallEntity);
    }

    return returnArray;
  }

  public update(tickDelta: number): void {}
}

export default Level3;
