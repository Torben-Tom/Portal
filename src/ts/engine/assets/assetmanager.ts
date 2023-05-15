import AnimatedTexture from "./texture/animatedtexture.js";
import Slice from "./texture/slice.js";
import SliceTexture from "./texture/slicetexture.js";
import SpriteSheet from "./texture/spritesheet.js";
import StaticTexture from "./texture/statictexture.js";
import Texture from "./texture/texture.js";

class AssetManager {
  private _spriteSheets: Map<string, SpriteSheet> = new Map();
  private _textures: Map<string, Texture> = new Map();

  constructor() {
    this._spriteSheets = new Map();
  }

  registerSpriteSheet(name: string, htmlImageElement: HTMLImageElement): void {
    if (this._spriteSheets.has(name)) {
      console.warn(
        `SpriteSheet ${name} already registered. Overwriting with new value.`
      );
    }
    this._spriteSheets.set(name, new SpriteSheet(htmlImageElement));
  }

  hasSpriteSheet(name: string): boolean {
    return this._spriteSheets.has(name);
  }

  getSpriteSheet(name: string): SpriteSheet {
    if (!this._spriteSheets.has(name)) {
      throw new Error(`SpriteSheet ${name} not found`);
    }
    return this._spriteSheets.get(name) as SpriteSheet;
  }

  registerStaticTexture(
    name: string,
    htmlImageElement: HTMLImageElement
  ): void {
    if (this._textures.has(name)) {
      console.warn(
        `Texture ${name} already registered. Overwriting with new value.`
      );
    }
    this._textures.set(name, new StaticTexture(htmlImageElement));
  }

  registerSliceTexture(name: string, slice: Slice): void {
    if (this._textures.has(name)) {
      console.warn(
        `Texture ${name} already registered. Overwriting with new value.`
      );
    }
    this._textures.set(name, new SliceTexture(slice));
  }

  registerAnimatedTexture(
    name: string,
    textures: Texture[],
    tickspeed: number
  ): void {
    if (this._textures.has(name)) {
      console.warn(
        `Texture ${name} already registered. Overwriting with new value.`
      );
    }
    this._textures.set(name, new AnimatedTexture(textures, tickspeed));
  }

  hasTexture(name: string): boolean {
    return this._textures.has(name);
  }

  getTexture(name: string): Texture {
    if (!this._textures.has(name)) {
      throw new Error(`Texture ${name} not found`);
    }
    return this._textures.get(name) as Texture;
  }
}

export default AssetManager;
