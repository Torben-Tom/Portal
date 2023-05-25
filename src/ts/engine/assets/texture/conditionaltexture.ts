import Texture from "./texture.js";

//TODO: Use engine's update loop instead of own setInterval
class ConditionalTexture extends Texture {
  private _defaultTexture: Texture;
  private _currentTexture: Texture | undefined;
  private _textures: Map<Function, Texture>;
  private _tickspeed: number;
  private _taskId: number;

  get htmlImageElement(): HTMLImageElement {
    return (
      this._currentTexture?.htmlImageElement ??
      this._defaultTexture.htmlImageElement
    );
  }

  get x(): number {
    return this._currentTexture?.x ?? this._defaultTexture.x;
  }

  get y(): number {
    return this._currentTexture?.y ?? this._defaultTexture.y;
  }

  get width(): number {
    return this._currentTexture?.width ?? this._defaultTexture.width;
  }

  get height(): number {
    return this._currentTexture?.height ?? this._defaultTexture.height;
  }

  constructor(
    defaultTexture: Texture,
    textures: Map<Function, Texture>,
    tickspeed: number
  ) {
    super();
    this._defaultTexture = defaultTexture;
    this._textures = textures;
    this._tickspeed = tickspeed;
    this._taskId = setInterval(() => this.updateTexture(), this._tickspeed);
  }

  private updateTexture(): void {
    for (let func of this._textures.keys()) {
      let result = func();
      if (typeof result !== "boolean") {
        console.warn(
          `Condition function ${func.name} did not return a boolean value. Ignoring the condition. Please check your code!`
        );
        continue;
      }

      if (result) {
        let texture: Texture | undefined = this._textures.get(func);
        if (!texture) {
          console.error(
            `Condition function ${func.name} returned true but the corresponding texture is undefined. Are you drunk?`
          );
        }
        this._currentTexture = texture;
        return;
      }
    }

    this._currentTexture = undefined;
  }

  stop(): void {
    clearInterval(this._taskId);
  }
}

export default ConditionalTexture;
