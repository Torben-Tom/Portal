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
import InputHandler from "../../engine/input/inputhandler.js";
import Services from "../../engine/dependencyinjection/services.js";
import EngineEvent from "../../engine/event/engineevent.js";
import EntityManager from "../../engine/entitiy/entitymanager.js";
import Goal from "../entities/goal.js";
import PlayerEntity from "../entities/playerentity.js";
import LevelManager from "../../engine/level/levelmanager.js";

class Level2 implements Level {
  private _inputHandler: InputHandler;
  private _entityManager: EntityManager;
  private _assetManager: AssetManager;
  private _goal!: Goal;

  constructor() {
    this._inputHandler = Services.resolve<InputHandler>("InputHandler");
    this._entityManager = Services.resolve<EntityManager>("EntityManager");
    this._assetManager = Services.resolve<AssetManager>("AssetManager");
  }

  public load(): void {
    this._goal.onTouch.subscribe((engineEvent: EngineEvent<Goal>) => {
      let levelManager: LevelManager =
        Services.resolve<LevelManager>("LevelManager");
      levelManager.startLevel("level3");
    });
  }

  public unload(): void {
    console.log("Level2 unloaded");
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

    this._goal = new Goal(70, 170, 1.6, 1.6, 0, 0);

    let returnArray: Entity[] = [];
    returnArray.push(window);
    returnArray.push(background);
    returnArray.push(player);
    returnArray.push(cornerBrickLeft);
    returnArray.push(cornerBrickRight);
    returnArray.push(this._goal);

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

    for (let i = 0; i < 7; i++) {
      let middleBrick = new MiddleBrickEntity(50 + i * 50, 250, 1.5, 1.5, 0, 0);
      returnArray.push(middleBrick);
    }
    for (let i = 0; i < 3; i++) {
      let middleBrick = new MiddleBrickEntity(50 + i * 50, 0, 1.5, 1.5, 0, 0);
      returnArray.push(middleBrick);
    }

    for (let i = 0; i < 3; i++) {
      let middleBrick = new LeftBrickEntity(200, 0 + i * 50, 1.5, 1.5, 0, 0);
      returnArray.push(middleBrick);
    }

    for (let i = 0; i < 7; i++) {
      let middleBrick = new MiddleBrickEntity(
        400 + i * 50,
        400,
        1.5,
        1.5,
        0,
        0
      );
      returnArray.push(middleBrick);
    }

    return returnArray;
  }

  public update(tickDelta: number): void {}
}

export default Level2;
