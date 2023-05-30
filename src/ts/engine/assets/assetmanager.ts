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

  registerSpriteSheet(
    name: string,
    htmlImageElement: HTMLImageElement
  ): SpriteSheet {
    if (this._spriteSheets.has(name)) {
      console.warn(
        `SpriteSheet ${name} already registered. Overwriting with new value.`
      );
    }

    let spriteSheet = new SpriteSheet(htmlImageElement);
    this._spriteSheets.set(name, spriteSheet);
    return spriteSheet;
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
  ): StaticTexture {
    if (this._textures.has(name)) {
      console.warn(
        `Texture ${name} already registered. Overwriting with new value.`
      );
    }

    let staticTexture = new StaticTexture(htmlImageElement);
    this._textures.set(name, staticTexture);
    return staticTexture;
  }

  registerSliceTexture(name: string, slice: Slice): SliceTexture {
    if (this._textures.has(name)) {
      console.warn(
        `Texture ${name} already registered. Overwriting with new value.`
      );
    }

    let sliceTexture = new SliceTexture(slice);
    this._textures.set(name, sliceTexture);
    return sliceTexture;
  }

  registerAnimatedTexture(
    name: string,
    textures: Texture[],
    tickspeed: number
  ): AnimatedTexture {
    if (this._textures.has(name)) {
      console.warn(
        `Texture ${name} already registered. Overwriting with new value.`
      );
    }

    let animatedTexture = new AnimatedTexture(textures, tickspeed);
    this._textures.set(name, animatedTexture);
    return animatedTexture;
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
