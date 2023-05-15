import Texture from "./texture.js";

class AnimatedTexture extends Texture {
  private _textures: Texture[];
  private _currentTextureIndex: number;
  private _tickspeed: number;
  private _taskId: number;

  get htmlImageElement(): HTMLImageElement {
    return this._textures[this._currentTextureIndex].htmlImageElement;
  }

  get x(): number {
    return this._textures[this._currentTextureIndex].x;
  }

  get y(): number {
    return this._textures[this._currentTextureIndex].y;
  }

  get width(): number {
    return this._textures[this._currentTextureIndex].width;
  }

  get height(): number {
    return this._textures[this._currentTextureIndex].height;
  }

  constructor(textures: Texture[], tickspeed: number) {
    super();
    this._textures = textures;
    this._currentTextureIndex = 0;
    this._tickspeed = tickspeed;
    this._taskId = setInterval(() => this.nextTexture(), this._tickspeed);
  }

  private nextTexture(): void {
    this._currentTextureIndex++;
    if (this._currentTextureIndex >= this._textures.length) {
      this._currentTextureIndex = 0;
    }
  }

  stop(): void {
    clearInterval(this._taskId);
  }
}

export default AnimatedTexture;
