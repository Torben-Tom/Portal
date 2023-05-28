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

class Level1 implements Level {
  private _inputHandler: InputHandler;

  constructor() {
    this._inputHandler = Services.resolve<InputHandler>("InputHandler");
  }
  public getEntities(assetManager: AssetManager): Entity[] {
    let buttonClicked = false;

    let window = new BackgroundTileEntity(
      552,
      141,
      1,
      1,
      assetManager.getTexture("window")
    );

    let background = new BackgroundTileEntity(
      0,
      0,
      1,
      1,
      assetManager.getTexture("level1-background")
    );

    let player = new NetworkEntity();
    let cornerBrickLeft = new LeftCornerBrickEntity(0, 550, 1.5, 1.5, 0, 0);
    let cornerBrickRight = new RightCornerBrickEntity(750, 550, 1.5, 1.5, 0, 0);

    let returnArray: Entity[] = [];
    returnArray.push(window);
    returnArray.push(background);
    returnArray.push(player);
    returnArray.push(cornerBrickLeft);
    returnArray.push(cornerBrickRight);

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

    // if (this._inputHandler.isKeyDown("f")) {
    //   console.log("f pressed");
    //   buttonClicked = true;
    // }
    buttonClicked = true; //erscheinen der Brücke
    if (buttonClicked == true) {
      for (let i = 0; i < 5; i++) {
        let bridge = new BridgeEntity(300 + i * 50, 300, 1.5, 1.5, 0, 0);
        returnArray.push(bridge);
      }
    }
    return returnArray;
  }

  public load(): void {
    console.log("Level1 loaded");
  }

  public unload(): void {
    console.log("Level1 unloaded");
  }
}

export default Level1;
