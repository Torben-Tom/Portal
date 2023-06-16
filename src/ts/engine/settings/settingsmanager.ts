import Setting from "./setting.js";

class SettingsManager {
  private _settings: Map<string, Setting<any>>;

  constructor() {
    this._settings = new Map();
  }

  public has(key: string): boolean {
    return this._settings.has(key);
  }

  public get<T>(key: string): Setting<T> {
    return this._settings.get(key) as Setting<T>;
  }

  public set<T>(key: string, value: Setting<T>): void {
    this._settings.set(key, value);
  }

  public getOrSet<T>(key: string, value: Setting<T>): Setting<T> {
    if (!this.has(key)) {
      this.set(key, value);
      return value;
    }

    return this.get(key);
  }
}

export default SettingsManager;
