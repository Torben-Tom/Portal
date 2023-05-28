import AssetManager from "../../engine/assets/assetmanager.js";
import BackgroundTileEntity from "../../engine/entitiy/backgroundtileentity.js";
import Entity from "../../engine/entitiy/entity.js";
import Level from "../../engine/level/level.js";
import NetworkEntity from "../entities/networkentity.js";
import NetworkEntity2 from "../entities/networkentity2.js";

class Level1 implements Level {
  public getEntities(assetManager: AssetManager): Entity[] {
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

    let ground = new NetworkEntity2(0, 150, 50, 5, 0, 0);
    let wall = new NetworkEntity2(500, 150, 5, 50, 0, 0);

    return [window, background, player, ground, wall];
  }

  public load(): void {
    console.log("Level1 loaded");
  }

  public unload(): void {
    console.log("Level1 unloaded");
  }
}

export default Level1;
