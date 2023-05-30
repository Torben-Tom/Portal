import AssetManager from "../assets/assetmanager.js";
import Entity from "../entitiy/entity.js";

interface Level {
  load(): void;
  unload(): void;
  getEntities(): Entity[];
  update(tickDelta: number): void;
}

export default Level;
