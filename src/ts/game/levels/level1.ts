import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import BackgroundTileEntity from "../../engine/entitiy/backgroundtileentity.js";
import Entity from "../../engine/entitiy/entity.js";
import Level from "../../engine/level/level.js";
import NetworkEntity from "../entities/networkentity.js";
import NetworkEntity2 from "../entities/networkentity2.js";

class Level1 implements Level {
  private _assetManager: AssetManager;

  constructor() {
    this._assetManager = Services.resolve<AssetManager>("AssetManager");
  }

  public load(): void {
    console.log("Level1 loaded");
  }

  public unload(): void {
    console.log("Level1 unloaded");
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

    let player = new NetworkEntity();

    let ground = new NetworkEntity2(0, 150, 0, 50, 15, 50, 5, 0, 0);
    let wall = new NetworkEntity2(500, 150, 0, 75, 15, 5, 50, 0, 0);

    return [window, background, player, ground, wall];
  }

  public update(tickDelta: number): void {}
}

export default Level1;
