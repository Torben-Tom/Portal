import AssetManager from "../assets/assetmanager.js";
import Entity from "../entitiy/entity.js";

interface Level {
  getEntities(assetManager: AssetManager): Entity[];
  load(): void;
  unload(): void;
}

export default Level;
