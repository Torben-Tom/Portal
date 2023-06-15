import EntityManager from "../entitiy/entitymanager.js";
import Level from "./level.js";

class LevelManager {
  private _levels: Map<string, Level>;
  private _currentLevel: Level | null;
  private _entityManager: EntityManager;

  get currentLevel(): Level | null {
    return this._currentLevel;
  }

  constructor(entityManager: EntityManager) {
    this._levels = new Map<string, Level>();
    this._currentLevel = null;
    this._entityManager = entityManager;
  }

  public has(name: string): boolean {
    return this._levels.has(name);
  }

  public register(name: string, level: Level): void {
    if (this._levels.has(name)) {
      console.warn(
        `Level with name ${name} already exists! Overwriting with new value.`
      );
    }
    this._levels.set(name, level);
  }

  public unload(): void {
    if (this._currentLevel !== null) {
      this._currentLevel.unload();
      this._currentLevel = null;
    }
    this._entityManager.clear();
  }

  public start(name: string): void {
    let level: Level | undefined = this._levels.get(name);
    if (!level) {
      throw new Error(`Level with name ${name} does not exist!`);
    }
    this.unload();

    this._currentLevel = level;
    this._entityManager.registerAll(level.getEntities());
    level.load();
  }

  public update(tickDelta: number): void {
    if (this._currentLevel) {
      this._currentLevel.update(tickDelta);
    }
  }
}

export default LevelManager;
