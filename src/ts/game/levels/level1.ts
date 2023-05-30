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
import PortalGreenCreate from "../entities/portalgreencreate.js";
import PortalPurple from "../entities/portalpurple.js";
import PortalPurpleCreate from "../entities/portalpurplecreate.js";
import PortalPurpleClose from "../entities/portalpurpleclose.js";
import PortalGreenClose from "../entities/portalgreenclose.js";
import ButtonGround from "../entities/buttonground.js";
import ButtonStanding from "../entities/buttonstanding.js";
import Goal from "../entities/goal.js";
import CompanionCube from "../entities/companioncube.js";
import PlayerJump from "../entities/playerjump.js";
import PlayerRunLeft from "../entities/playerrunleft.js";
import PlayerRunRight from "../entities/playerrunright.js";

class Level1 implements Level {
  private _inputHandler: InputHandler;
  private _entityManager: EntityManager;
  private _assetManager: AssetManager;

  constructor() {
    this._inputHandler = Services.resolve<InputHandler>("InputHandler");
    this._entityManager = Services.resolve<EntityManager>("EntityManager");
    this._assetManager = Services.resolve<AssetManager>("AssetManager");
  }

  public load(): void {
    this._inputHandler.keyDownEvent.subscribe(
      (key: EngineEvent<KeyboardEvent>) => {
        if (key.eventData.key == "f") {
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
      }
    );

    this._inputHandler.keyUpEvent.subscribe(
      (key: EngineEvent<KeyboardEvent>) => {
        if (key.eventData.key == "f") {
          this._entityManager.unregisterAll(
            this._entityManager.entities.filter(
              (entity) => entity instanceof BridgeEntity
            )
          );
        }
      }
    );
  }

  public unload(): void {
    console.log("Level1 unloaded");
  }

  public getEntities(): Entity[] {
    let window = new BackgroundTileEntity(
      552,
      141,
      1,
      1,
      this._assetManager.getTexture("window")
    );

    let background = new BackgroundTileEntity(
      0,
      0,
      1,
      1,
      this._assetManager.getTexture("level1-background")
    );

    let player = new NetworkEntity();
    let cornerBrickLeft = new LeftCornerBrickEntity(0, 550, 1.5, 1.5, 0, 0);
    let cornerBrickRight = new RightCornerBrickEntity(750, 550, 1.5, 1.5, 0, 0);

    let greenPortal = new PortalGreen(650, 400, 2.5, 2.5, -110, 0);
    let greenPortalCreate = new PortalGreenCreate(600, 430, 2, 2, 0, 0);
    let greenPortalClose = new PortalGreenClose(640, 430, 2, 2, 0, 0);
    let purplePortal = new PortalPurple(0, 150, 2.5, 2.5, -110, 0);
    let purplePortalCreate = new PortalPurpleCreate(600, 230, 2, 2, 0, 0);
    let purplePortalClose = new PortalPurpleClose(640, 230, 2, 2, 0, 0);
    let buttonGround = new ButtonGround(300, 490, 1.3, 1.3, 0, 0);
    let buttonStanding = new ButtonStanding(550, 470, 1.1, 1.1, 0, 0);
    let companionCube = new CompanionCube(200, 250, 0.5, 0.5, 0, 0);
    let goal = new Goal(685, 275, 1.6, 1.6, 0, 0);
    let playerJump = new PlayerJump(130, 460, 2, 2, 0, 0);
    let playerRunLeft = new PlayerRunLeft(30, 455, 2, 2, 0, 0);
    let playerRunRight = new PlayerRunRight(190, 455, 2, 2, 0, 0);

    let returnArray: Entity[] = [];
    returnArray.push(window);
    returnArray.push(background);
    returnArray.push(player);
    returnArray.push(cornerBrickLeft);
    returnArray.push(cornerBrickRight);
    returnArray.push(greenPortal);
    // returnArray.push(greenPortalCreate);
    // returnArray.push(greenPortalClose);
    returnArray.push(purplePortal);
    // returnArray.push(purplePortalCreate);
    // returnArray.push(purplePortalClose);
    returnArray.push(buttonGround);
    returnArray.push(buttonStanding);
    returnArray.push(companionCube);
    returnArray.push(goal);
    returnArray.push(playerJump);
    returnArray.push(playerRunLeft);
    returnArray.push(playerRunRight);

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

  public update(tickDelta: number): void {}
}

export default Level1;
