import AssetManager from "../assets/assetmanager.js";
import Entity from "../entitiy/entity.js";

interface Level {
  getEntities(): Entity[];
  load(): void;
  unload(): void;
  update(tickDelta: number): void;
}

export default Level;
