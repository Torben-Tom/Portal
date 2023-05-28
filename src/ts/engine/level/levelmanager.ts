import AssetManager from "../assets/assetmanager.js";
import EntityManager from "../entitiy/entitymanager.js";
import Level from "./level.js";

class LevelManager {
  private _levels: Map<string, Level>;
  private _currentLevel: Level | null;
  private _assetManager: AssetManager;
  private _entityManager: EntityManager;

  get currentLevel(): Level | null {
    return this._currentLevel;
  }

  constructor(assetManager: AssetManager, entityManager: EntityManager) {
    this._levels = new Map<string, Level>();
    this._currentLevel = null;
    this._assetManager = assetManager;
    this._entityManager = entityManager;
  }

  public hasLevel(name: string): boolean {
    return this._levels.has(name);
  }

  public registerLevel(name: string, level: Level): void {
    if (this._levels.has(name)) {
      console.warn(
        `Level with name ${name} already exists! Overwriting with new value.`
      );
    }
    this._levels.set(name, level);
  }

  public startLevel(name: string): void {
    if (!this._levels.has(name)) {
      throw new Error(`Level with name ${name} does not exist!`);
    }

    if (this._currentLevel !== null) {
      this._currentLevel.unload();
    }

    this._entityManager.clear();

    let level: Level = this._levels.get(name)!;
    this._entityManager.registerAll(level.getEntities(this._assetManager));
    level.load();
  }
}

export default LevelManager;
